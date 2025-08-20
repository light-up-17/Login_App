import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Navbar() {
  const navigate = useNavigate();

  async function logout() {
    await api('/auth/logout', { method: 'POST' });
    navigate('/login');
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#f5f5f5' }}>
      <Link to="/">Dashboard</Link>
      <button
        onClick={logout}
        style={{
          background: 'none',
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: '6px 12px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}
