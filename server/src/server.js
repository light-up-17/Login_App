import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './auth.routes.js';


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
origin: process.env.CLIENT_ORIGIN,
credentials: true,
}));


app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));