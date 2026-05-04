import React, { useState } from 'react';
import { Search, FileSearch, Calendar, Clock, Info, ShieldAlert } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import './CaseTracking.css';

const CaseTracking = () => {
  const [searchParams, setSearchParams] = useState({
    caseId: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const mockCaseData = {
    id: 'CASE-12345',
    clientName: 'أحمد محمود',
    type: 'قضية مدنية',
    status: 'قيد المراجعة',
    nextSessionDate: '2026-06-15',
    lastUpdate: 'تم تقديم المذكرة الأولى للمحكمة.',
    lawyer: 'أ. سمر سمير'
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCaseData(null);

    try {
      const { data, error: dbError } = await supabase
        .from('cases')
        .select('*')
        .eq('case_id', searchParams.caseId)
        .eq('client_phone', searchParams.phone)
        .single();

      if (dbError || !data) {
        setError('لم يتم العثور على قضية مطابقة. يرجى التأكد من رقم القضية ورقم الهاتف.');
      } else {
        setCaseData(data);
      }
    } catch (err) {
      setError('حدث خطأ أثناء البحث. يرجى المحاولة لاحقاً.');
    }
    
    setLoading(false);
  };

  return (
    <div className="tracking-page animate-fade-in">
      <div className="container">
        <div className="tracking-header text-center">
          <h1 className="section-title">متابعة حالة القضية</h1>
          <p className="text-muted">أدخل رقم القضية ورقم الهاتف المسجل لدينا للاطلاع على آخر التطورات الخاصة بقضيتك بسرية تامة.</p>
        </div>

        <div className="tracking-search-wrapper">
          <form className="tracking-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label className="form-label"><FileSearch size={16} className="text-gold" /> رقم القضية (Case ID)</label>
              <input 
                type="text" 
                className="form-control" 
                name="caseId" 
                value={searchParams.caseId} 
                onChange={handleChange} 
                placeholder="مثال: CASE-12345" 
                required 
                dir="ltr"
                style={{ textAlign: 'right' }}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label"><ShieldAlert size={16} className="text-gold" /> رقم الهاتف المسجل</label>
              <input 
                type="tel" 
                className="form-control" 
                name="phone" 
                value={searchParams.phone} 
                onChange={handleChange} 
                placeholder="أدخل رقم الهاتف للتحقق" 
                required 
                dir="ltr"
                style={{ textAlign: 'right' }}
              />
            </div>

            <button type="submit" className="btn btn-primary search-btn" disabled={loading}>
              {loading ? 'جاري البحث...' : (
                <>
                  <Search size={18} /> بحث عن القضية
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message animate-fade-in">
            {error}
          </div>
        )}

        {caseData && (
          <div className="case-details-card animate-fade-in">
            <div className="case-header">
              <h3>تفاصيل القضية: {caseData.id || caseData.case_id}</h3>
              <span className="status-badge">{caseData.status}</span>
            </div>
            
            <div className="case-info-grid">
              <div className="info-item">
                <span className="info-label">نوع القضية</span>
                <span className="info-value">{caseData.type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">المحامي المسؤول</span>
                <span className="info-value">{caseData.lawyer}</span>
              </div>
              <div className="info-item full-width">
                <span className="info-label"><Calendar size={16} className="text-gold inline-icon" /> موعد الجلسة القادمة</span>
                <span className="info-value highlight">{caseData.nextSessionDate || caseData.next_session_date || 'لم يحدد بعد'}</span>
              </div>
              <div className="info-item full-width update-box">
                <span className="info-label"><Info size={16} className="text-gold inline-icon" /> آخر تحديث</span>
                <p className="update-text">{caseData.lastUpdate || caseData.last_update}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseTracking;
