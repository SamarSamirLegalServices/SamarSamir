import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowLeft } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content animate-fade-in">
        <div className="hero-logo-large">
          <Scale size={80} className="text-gold" />
        </div>
        
        <h1 className="hero-title english-title text-gold">SAMAR SAMIR</h1>
        <h2 className="hero-subtitle english-title">LEGAL SERVICES</h2>
        
        <p className="hero-desc">
          خدمات قانونية شاملة في جميع فروع القانون.
          كل قضية تهمنا.. كل عميل يستحق الأفضل.
        </p>
        
        <div className="hero-actions">
          <Link to="/booking" className="btn btn-primary btn-lg">
            احجز استشارتك الآن
            <ArrowLeft size={18} />
          </Link>
          <Link to="/track-case" className="btn btn-outline btn-lg">
            متابعة قضيتك
          </Link>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🛡️</span>
            <span>سرية تامة وثقة تدوم</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏱️</span>
            <span>متابعة احترافية وسرعة إنجاز</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>استشارات دقيقة وحلول عملية</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
