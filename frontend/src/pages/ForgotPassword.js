import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');

  const handleSendOtp = async e => {
    e.preventDefault();
    const res = await fetch('/api/users/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMsg(data.message || data.error);
    if (data.message) setStep(2);
  };

  const handleReset = async e => {
    e.preventDefault();
    const res = await fetch('/api/users/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={handleSendOtp}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleReset}>
          <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
      <div>{msg}</div>
    </div>
  );
}
