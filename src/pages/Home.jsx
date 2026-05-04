import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Briefcase, Building2, ShieldAlert, Users, FileText, BadgeDollarSign, MessageSquare, ShieldCheck } from 'lucide-react';
import './Home.css';

const Home = () => {
  const services = [
    { id: 1, title: 'القضايا المدنية والتجارية', icon: Briefcase, desc: 'تمثيل قانوني شامل في المنازعات المدنية والتجارية لحماية حقوقك ومصالحك.' },
    { id: 2, title: 'قضايا الشركات والتأسيس', icon: Building2, desc: 'خدمات تأسيس الشركات وإعادة الهيكلة وتقديم الدعم القانوني المستمر للكيانات التجارية.' },
    { id: 3, title: 'القضايا الجنائية', icon: ShieldAlert, desc: 'دفاع جنائي قوي واحترافي لضمان محاكمة عادلة وحماية كاملة للحقوق.' },
    { id: 4, title: 'قضايا الأسرة', icon: Users, desc: 'معالجة قضايا الأحوال الشخصية والأسرة بسرية تامة واحترافية للحفاظ على كيان الأسرة.' },
    { id: 5, title: 'صياغة ومراجعة العقود', icon: FileText, desc: 'صياغة دقيقة ومراجعة قانونية شاملة للعقود لتجنب الثغرات وضمان حقوق الأطراف.' },
    { id: 6, title: 'التحصيل والتنفيذ', icon: BadgeDollarSign, desc: 'إجراءات قانونية فعالة لتحصيل الديون وتنفيذ الأحكام القضائية بأسرع وقت.' },
    { id: 7, title: 'الاستشارات القانونية', icon: MessageSquare, desc: 'استشارات قانونية دقيقة وحلول عملية مبتكرة لمختلف التحديات القانونية.' },
    { id: 8, title: 'الامتثال والحوكمة', icon: ShieldCheck, desc: 'ضمان توافق أعمالك مع القوانين المحلية والدولية لحماية البيانات وحوكمة الشركات.' }
  ];

  return (
    <div className="home-page">
      <Hero />
      
      <section className="page-section bg-bg">
        <div className="container">
          <h2 className="section-title">مجالات تخصصنا</h2>
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.desc}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section cta-section">
        <div className="container text-center">
          <h2 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>هل تحتاج إلى استشارة قانونية فورية؟</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem', color: '#E6F1FF' }}>
            فريقنا من المحامين والمستشارين القانونيين جاهز لتقديم الدعم والمشورة التي تحتاجها لحماية حقوقك.
          </p>
          <a href="/booking" className="btn btn-primary btn-lg">احجز موعدك الآن</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
