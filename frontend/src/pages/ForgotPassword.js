import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/ForgotPassword.css';

// Read backend base URL from env and normalize (fallback to empty for relative path)
const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMsg({ 
          text: data.message || 'OTP sent to your email', 
          type: 'success' 
        });
        setStep(2);
      } else {
        setMsg({ 
          text: data.error || 'Failed to send OTP', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMsg({ 
        text: 'Network error. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMsg({ 
        text: 'Passwords do not match', 
        type: 'error' 
      });
      return;
    }

    if (newPassword.length < 6) {
      setMsg({ 
        text: 'Password must be at least 6 characters', 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMsg({ 
          text: data.message || 'Password reset successfully!', 
          type: 'success' 
        });
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else {
        setMsg({ 
          text: data.error || 'Failed to reset password', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMsg({ 
        text: 'Network error. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep(1);
    setMsg({ text: '', type: '' });
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="forgotpassword-container">
      <div className="forgotpassword-card">
        <div className="forgotpassword-header">
          <div className="forgotpassword-icon">🔒</div>
          <h1 className="forgotpassword-title">
            {step === 1 ? 'Reset Your Password' : 'Create New Password'}
          </h1>
          <p className="forgotpassword-subtitle">
            {step === 1 
              ? 'Enter your email address and we\'ll send you an OTP to reset your password'
              : 'Enter the OTP sent to your email and create a new password'
            }
          </p>
        </div>

        {/* Progress Steps */}
        <div className="forgotpassword-steps">
          <div className={`forgotpassword-step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Enter Email</span>
          </div>
          <div className="step-connector"></div>
          <div className={`forgotpassword-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Reset Password</span>
          </div>
        </div>

        {/* Message Display */}
        {msg.text && (
          <div className={`forgotpassword-message ${msg.type}`}>
            <div className="message-icon">
              {msg.type === 'success' ? '✓' : '⚠'}
            </div>
            <span>{msg.text}</span>
          </div>
        )}

        {step === 1 ? (
          // Step 1: Email Input
          <form className="forgotpassword-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <button 
              type="submit" 
              className="forgotpassword-btn primary"
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <div className="btn-spinner"></div>
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>

            <div className="forgotpassword-links">
              <Link to="/signin" className="back-link">
                ← Back to Sign In
              </Link>
            </div>
          </form>
        ) : (
          // Step 2: OTP and New Password
          <form className="forgotpassword-form" onSubmit={handleReset}>
            <div className="form-group">
              <label htmlFor="otp" className="form-label">OTP Code</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                disabled={loading}
                className="form-input"
                maxLength={6}
              />
              <small className="form-hint">
                Enter the 6-digit code sent to {email}
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                className="form-input"
                minLength={6}
              />
              <small className="form-hint">
                Must be at least 6 characters long
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="forgotpassword-actions">
              <button 
                type="submit" 
                className="forgotpassword-btn primary"
                disabled={loading || !otp || !newPassword || !confirmPassword}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
              
              <button 
                type="button" 
                className="forgotpassword-btn secondary"
                onClick={handleBackToEmail}
                disabled={loading}
              >
                Change Email
              </button>
            </div>

            <div className="forgotpassword-links">
              <Link to="/signin" className="back-link">
                ← Back to Sign In
              </Link>
            </div>
          </form>
        )}

        {/* Resend OTP Option */}
        {step === 2 && (
          <div className="resend-otp">
            <p>Didn't receive the OTP?</p>
            <button 
              type="button" 
              className="resend-link"
              onClick={handleSendOtp}
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}