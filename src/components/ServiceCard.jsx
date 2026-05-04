import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        <Icon className="service-icon" size={32} />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      <Link to={`/booking?service=${encodeURIComponent(title)}`} className="service-link text-gold">
        طلب الخدمة &larr;
      </Link>
    </div>
  );
};

export default ServiceCard;
