// Contact.js
import React from 'react';
import './styles/Contact.css';

const Contact = () => {
  const handleConnect = () => {
    window.open('https://github.com/SuryaNarayananDev/ECORAIZ-The_Smart_Planting/discussions', '_blank');
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="contact-icon">🌿</div>
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-message">
          Have questions or want to contribute? Connect with us on GitHub Discussions.
        </p>
        <button className="connect-btn" onClick={handleConnect}>
          Connect on GitHub
        </button>
      </div>
    </div>
  );
};

export default Contact;