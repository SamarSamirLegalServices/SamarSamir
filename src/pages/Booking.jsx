import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Phone, FileText, Send } from 'lucide-react';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'الاستشارات القانونية',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `*طلب حجز استشارة جديدة* ⚖️
    
*الاسم:* ${formData.name}
*رقم الهاتف:* ${formData.phone}
*نوع الخدمة المطلوبة:* ${formData.service}
*التاريخ المفضل:* ${formData.date}
*الوقت المفضل:* ${formData.time}

*تفاصيل إضافية:*
${formData.notes || 'لا يوجد'}

يرجى التواصل معي لتأكيد الموعد.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201110487889?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const servicesList = [
    'القضايا المدنية والتجارية',
    'قضايا الشركات والتأسيس',
    'القضايا الجنائية',
    'قضايا الأسرة',
    'صياغة ومراجعة العقود',
    'التحصيل والتنفيذ',
    'الاستشارات القانونية',
    'الامتثال والحوكمة وحماية البيانات'
  ];

  return (
    <div className="booking-page animate-fade-in">
      <div className="container">
        <div className="booking-header text-center">
          <h1 className="section-title">حجز استشارة قانونية</h1>
          <p className="text-muted">نحن هنا للاستماع إليك وتقديم الدعم القانوني اللازم. احجز موعدك الآن وسيتم تأكيده عبر الواتساب.</p>
        </div>

        <div className="booking-form-wrapper">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><User size={16} className="text-gold" /> الاسم بالكامل</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required placeholder="أدخل اسمك الثلاثي" />
              </div>
              <div className="form-group">
                <label className="form-label"><Phone size={16} className="text-gold" /> رقم الهاتف (واتساب)</label>
                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required placeholder="مثال: 01110487889" dir="ltr" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><FileText size={16} className="text-gold" /> نوع الخدمة / القضية</label>
              <select className="form-control" name="service" value={formData.service} onChange={handleChange} required>
                {servicesList.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><Calendar size={16} className="text-gold" /> التاريخ المفضل</label>
                <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label"><Clock size={16} className="text-gold" /> الوقت المفضل</label>
                <input type="time" className="form-control" name="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">تفاصيل مختصرة عن الموضوع (اختياري)</label>
              <textarea className="form-control" name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="اكتب نبذة مختصرة عن استشارتك..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              <Send size={18} />
              إرسال الطلب عبر واتساب
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
