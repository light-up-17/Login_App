import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api';


export default function PrivateRoute({ children }) {
const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);


useEffect(() => {
let ignore = false;
api('/auth/me')
.then(({ user }) => { if (!ignore) { setUser(user); setLoading(false); } })
.catch(() => { if (!ignore) { setUser(null); setLoading(false); } });
return () => { ignore = true; };
}, []);


if (loading) return <div style={{ padding: 24 }}>Checking session…</div>;
if (!user) return <Navigate to="/login" replace />;
return children;
}