import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="navbar-container">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <Scale className="logo-icon" size={32} />
          <div className="logo-text">
            <h1>سمر سمير</h1>
            <span>للخدمات القانونية</span>
          </div>
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`navbar-links ${isOpen ? 'show' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={toggleMenu}>الرئيسية</Link>
          <Link to="/booking" className={`nav-link ${isActive('/booking')}`} onClick={toggleMenu}>حجز استشارة</Link>
          <Link to="/track-case" className={`nav-link ${isActive('/track-case')}`} onClick={toggleMenu}>متابعة قضية</Link>
          <Link to="/booking" className="btn btn-primary" onClick={toggleMenu}>تواصل معنا</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
