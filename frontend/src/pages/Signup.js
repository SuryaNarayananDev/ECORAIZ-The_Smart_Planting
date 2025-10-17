import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Signup.css';

// Read backend base URL from env and normalize (fallback to empty for relative path)
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Signup</h2>
        <label>
          Name:
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="signup-btn" type="submit">Signup</button>
        <div className="signup-msg">{msg}</div>

        {/* added footer with sign-in link */}
        <div className="signup-footer">
          Already have an account? <Link to="/signin">Sign in</Link>
        </div>
      </form>
    </div>
  );
}
