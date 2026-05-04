import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Scale } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo" style={{ marginBottom: '1rem', display: 'flex' }}>
            <Scale className="logo-icon" size={40} />
            <div className="logo-text">
              <h1 style={{ fontSize: '2rem' }}>سمر سمير</h1>
              <span>للخدمات القانونية</span>
            </div>
          </Link>
          <p className="footer-desc">
            نقدم استشارات قانونية شاملة وحلول مبتكرة في جميع فروع القانون، مع الالتزام التام بالسرية والاحترافية وسرعة الإنجاز.
          </p>
        </div>

        <div className="footer-links-group">
          <h3>روابط سريعة</h3>
          <ul>
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/booking">حجز استشارة</Link></li>
            <li><Link to="/track-case">متابعة قضية</Link></li>
            <li><Link to="/admin">بوابة الموظفين</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>تواصل معنا</h3>
          <ul>
            <li>
              <Phone size={18} className="text-gold" />
              <a href="https://wa.me/201110487889" target="_blank" rel="noreferrer" style={{ direction: 'ltr', display: 'inline-block' }}>+20 111 048 7889</a>
            </li>
            <li>
              <MapPin size={18} className="text-gold" />
              <span>جمهورية مصر العربية</span>
            </li>
            <li>
              <Mail size={18} className="text-gold" />
              <a href="mailto:info@samarsamir.law">info@samarsamir.law</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} سمر سمير للخدمات القانونية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
