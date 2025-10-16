import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signin.css';

export default function Signin({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.token) {
        onLogin(data.token);
        navigate('/profile');
      } else {
        setMsg(data.error || 'Signin failed');
      }
    } catch {
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <form className="signin-card" onSubmit={handleSubmit}>
        <h2 className="signin-title">Welcome back</h2>

        <label className="field">
          <span className="label-text">Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className="input"
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span className="label-text">Password</span>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="input"
            autoComplete="current-password"
          />
        </label>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <button
            type="button"
            className="btn link"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </button>
        </div>

        {msg && <div className="signin-msg">{msg}</div>}

        <div className="signin-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
