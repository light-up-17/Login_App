import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from './db.js';


const router = Router();


function setAuthCookie(res, payload) {
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
const isProd = process.env.NODE_ENV === 'production';
res.cookie('token', token, {
httpOnly: true,
sameSite: 'lax',
secure: isProd, // true behind HTTPS in prod
maxAge: 7 * 24 * 60 * 60 * 1000,
});
}

router.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) {
return res.status(400).json({ message: 'Name, email, and password are required' });
}


const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
if (existing.length) return res.status(409).json({ message: 'Email already in use' });


const password_hash = await bcrypt.hash(password, 12);
const [result] = await pool.query(
'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
[name, email, password_hash]
);


setAuthCookie(res, { id: result.insertId, email, name });
res.status(201).json({ id: result.insertId, name, email });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
const user = rows[0];
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


setAuthCookie(res, { id: user.id, email: user.email, name: user.name });
res.json({ id: user.id, name: user.name, email: user.email });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


router.post('/logout', (req, res) => {
res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
res.json({ message: 'Logged out' });
});


router.get('/me', async (req, res) => {
try {
const token = req.cookies?.token;
if (!token) return res.status(200).json({ user: null });
const payload = jwt.verify(token, process.env.JWT_SECRET);
// Optionally re-fetch fresh user data
const [rows] = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = ?', [payload.id]);
const user = rows[0] || null;
res.json({ user });
} catch (err) {
return res.status(200).json({ user: null });
}
});


export default router;