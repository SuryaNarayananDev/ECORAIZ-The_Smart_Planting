// EnhancedHeader.jsx
import React, { useState, useEffect } from 'react';
import './Styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // read token from localStorage and fetch profile name if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserName('');
      return;
    }

    setLoadingUser(true);
    fetch('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authorized');
        return res.json();
      })
      .then(data => {
        if (data.user && data.user.name) setUserName(data.user.name);
      })
      .catch(() => {
        setUserName('');
      })
      .finally(() => setLoadingUser(false));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const onProfileClick = () => {
    navigate('/profile');
  };

  const renderAuthArea = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return (
        <div className="header-right auth-area">
          {/* <Link to="/signin" className="auth-login">Sign in</Link> */}
          <Link to="/signup" className="auth-signup">Sign up</Link>
        </div>
      );
    }

    // show initials circle when logged in
    const initials = userName
      ? userName.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase()
      : '?';

    return (
      <div className="header-right">
        <button
          className="profile-circle"
          title={userName || 'Profile'}
          onClick={onProfileClick}
          aria-label="Open profile"
        >
          {loadingUser ? '…' : initials}
        </button>
      </div>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu} className="home-link">
            <span className="home-icon">🌱</span>
            <span className="home-text">Eco-raiz</span>
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/Soilanalysis" onClick={closeMenu}>Soil Analysis</Link></li>
            <li><Link to="/plotanalysis" onClick={closeMenu}>Plot Analysis</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </nav>

        {/* actions + auth area */}
        {/* <div className="header-actions">
          <button className="cta-button">Get Started</button>
        </div> */}

        {renderAuthArea()}

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;