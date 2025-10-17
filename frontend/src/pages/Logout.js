import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Read backend base URL from env and normalize (fallback to empty for relative path)
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

export default function Logout({ onLogout }) {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      // optional: include token if stored
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
      try {
        await fetch(`${API_BASE_URL}/api/users/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          credentials: 'include'
        });
      } catch {
        // ignore network/logout endpoint errors
      } finally {
        onLogout();
        navigate('/signin');
      }
    })();
  }, [onLogout, navigate]);

  return <div>Logging out...</div>;
}
