import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // POST /api/auth/login (server will set an httpOnly cookie)
      await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      navigate('/'); // go to dashboard after login
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '16px'
    }}>
      <div style={{ 
        maxWidth: 440, 
        width: '100%',
        background: 'white', 
        padding: '40px', 
        borderRadius: 16, 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e1e5eb'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            color: '#1a3a5f', 
            fontSize: 28, 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            InsurAI
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: 16 }}>Corporate Policy Automation & Intelligence System</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: 24, fontWeight: 600 }}>Welcome back</h2>
          <p style={{ color: '#64748b', margin: 0 }}>Sign in to your account to continue</p>
        </div>

        {error && (
          <div role="alert" style={{ 
            background: '#fef2f2', 
            color: '#dc2626', 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            border: '1px solid #fecaca'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
              style={{ 
                padding: '12px 16px', 
                borderRadius: 8, 
                border: '1px solid #d1d5db',
                fontSize: 16,
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#4f46e5';
                e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: '#374151' }}>Password</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  borderRadius: 8, 
                  border: '1px solid #d1d5db',
                  fontSize: 16,
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4f46e5';
                  e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: 8, 
                  border: '1px solid #d1d5db', 
                  background: 'white', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#f9fafb';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'white';
                }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              background: loading ? '#93c5fd' : '#4f46e5',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: 16,
              marginTop: 8,
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)',
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.background = '#4338ca';
                e.target.style.boxShadow = '0 6px 8px rgba(79, 70, 229, 0.3)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.background = '#4f46e5';
                e.target.style.boxShadow = '0 4px 6px rgba(79, 70, 229, 0.2)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Signing in...
              </div>
            ) : 'Sign in'}
          </button>
        </form>

        <p style={{ 
          marginTop: 32, 
          textAlign: 'center', 
          color: '#64748b',
          fontSize: 14 
        }}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: '#4f46e5', 
              fontWeight: 500, 
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#4338ca';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#4f46e5';
            }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}