import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Profile.css';

export default function Profile({ token }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [token]);

  
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.status === 404) {
        setNotFound(true);
        return;
      }
      
      if (!res.ok) throw new Error('Failed to fetch profile');
      
      const data = await res.json();
      if (data && data.user) setForm(data.user);
    } catch (error) {
      setNotFound(true);
      showMessage('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 5000);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setUpdating(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: form.name })
      });
      
      const data = await res.json();
      
      if (data.user) {
        setForm(data.user);
        showMessage('Profile updated successfully!', 'success');
        setEditing(false);
      } else {
        showMessage(data.error || 'Update failed', 'error');
      }
    } catch (error) {
      showMessage('Network error. Please try again.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    showMessage('Logged out successfully', 'success');
    setTimeout(() => navigate('/signin'), 1000);
  };

  const handleCancel = () => {
    setEditing(false);
    fetchProfile(); // Reset form with original data
    setMsg({ text: '', type: '' });
  };

  // Loading State
  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-skeleton">
          <div className="skeleton-header"></div>
          <div className="skeleton-field"></div>
          <div className="skeleton-field"></div>
          <div className="skeleton-buttons"></div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (notFound) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <div className="error-icon">⚠️</div>
          <h2>Profile Not Found</h2>
          <p>We couldn't find your profile information.</p>
          <button 
            className="profile-retry-btn"
            onClick={fetchProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2 className="profile-title">Profile Settings</h2>
          <div className="profile-avatar">
            {form.name ? form.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>

        {/* Message Display */}
        {msg.text && (
          <div className={`profile-message ${msg.type}`}>
            {msg.text}
          </div>
        )}

        {!editing ? (
          // View Mode
          <div className="profile-view">
            <div className="profile-info">
              <div className="info-item">
                <label>Full Name</label>
                <div className="info-value">{form.name || 'Not set'}</div>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <div className="info-value">{form.email}</div>
              </div>
              <div className="info-item">
                <label>Account Type</label>
                <div className="info-value">Standard User</div>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setEditing(true)}
                disabled={updating}
              >
                Edit Profile
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleLogout}
                disabled={updating}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={updating}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                disabled
                className="disabled-field"
              />
              <small className="field-note">
                Email cannot be changed. Contact support for assistance.
              </small>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <span className="spinner"></span>
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={updating}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}