import React, { useState, useEffect } from 'react';
import { Lock, Plus, List, Edit2, LogOut, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('add');
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    case_id: '',
    client_phone: '',
    client_name: '',
    type: '',
    status: 'قيد المراجعة',
    next_session_date: '',
    last_update: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.password === 'J9KXIeeJiXCeoiA7' || loginData.password === 'admin123') {
      setIsAuthenticated(true);
      fetchCases();
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  const fetchCases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setCases(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCase = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('cases')
      .insert([formData]);

    if (error) {
      alert('حدث خطأ أثناء إضافة القضية: ' + error.message);
    } else {
      alert('تمت إضافة القضية بنجاح!');
      setFormData({
        case_id: '',
        client_phone: '',
        client_name: '',
        type: '',
        status: 'قيد المراجعة',
        next_session_date: '',
        last_update: ''
      });
      fetchCases();
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper animate-fade-in">
        <div className="admin-login-box">
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <Lock size={48} className="text-gold" style={{ margin: '0 auto 1rem' }} />
            <h2>بوابة الإدارة</h2>
            <p className="text-muted">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">البريد الإلكتروني</label>
              <input 
                type="email" 
                className="form-control" 
                dir="ltr" 
                value={loginData.email} 
                onChange={(e) => setLoginData({...loginData, email: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">كلمة المرور</label>
              <input 
                type="password" 
                className="form-control" 
                dir="ltr" 
                value={loginData.password} 
                onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>تسجيل الدخول</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade-in">
      <div className="admin-sidebar">
        <div className="admin-brand">
          <h2>لوحة الإدارة</h2>
        </div>
        <nav className="admin-nav">
          <button 
            className={`admin-nav-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <Plus size={18} /> إضافة قضية جديدة
          </button>
          <button 
            className={`admin-nav-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('list');
              fetchCases();
            }}
          >
            <List size={18} /> إدارة القضايا
          </button>
        </nav>
        
        <button 
          className="admin-nav-btn logout-btn" 
          onClick={() => setIsAuthenticated(false)}
          style={{ marginTop: 'auto' }}
        >
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'add' && (
          <div className="admin-panel">
            <h2 className="panel-title">إضافة قضية جديدة للعميل</h2>
            <p className="text-muted" style={{ marginBottom: '2rem' }}>
              سيتمكن العميل من متابعة هذه القضية باستخدام رقم القضية ورقم هاتفه.
            </p>
            
            <form className="admin-form" onSubmit={handleAddCase}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">رقم القضية (معرف فريد)</label>
                  <input type="text" name="case_id" value={formData.case_id} onChange={handleChange} className="form-control" placeholder="مثال: CASE-2026-001" required />
                </div>
                <div className="form-group">
                  <label className="form-label">رقم هاتف العميل</label>
                  <input type="tel" name="client_phone" value={formData.client_phone} onChange={handleChange} className="form-control" placeholder="0111xxxxxxx" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">اسم العميل</label>
                  <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">نوع القضية</label>
                  <input type="text" name="type" value={formData.type} onChange={handleChange} className="form-control" placeholder="مثال: مدني، جنائي، أسرة" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">حالة القضية</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="form-control">
                    <option>قيد المراجعة</option>
                    <option>متداولة بالمحكمة</option>
                    <option>محجوزة للحكم</option>
                    <option>تم الاستئناف</option>
                    <option>منتهية</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">موعد الجلسة القادمة (إن وجد)</label>
                  <input type="date" name="next_session_date" value={formData.next_session_date} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">آخر تحديث / ملاحظات للعميل</label>
                <textarea name="last_update" value={formData.last_update} onChange={handleChange} className="form-control" rows="4" required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : 'حفظ وإضافة القضية'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="admin-panel">
            <h2 className="panel-title">قائمة القضايا المسجلة</h2>
            
            <div className="mock-table-wrapper" style={{ marginTop: '2rem', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-accent)', textAlign: 'right' }}>
                    <th style={{ padding: '1rem' }}>رقم القضية</th>
                    <th style={{ padding: '1rem' }}>العميل</th>
                    <th style={{ padding: '1rem' }}>الحالة</th>
                    <th style={{ padding: '1rem' }}>تاريخ الجلسة</th>
                    <th style={{ padding: '1rem' }}>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>جاري التحميل...</td>
                    </tr>
                  ) : cases.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>لا توجد قضايا مسجلة حتى الآن.</td>
                    </tr>
                  ) : (
                    cases.map(caseItem => (
                      <tr key={caseItem.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '1rem' }}>{caseItem.case_id}</td>
                        <td style={{ padding: '1rem' }}>{caseItem.client_name}</td>
                        <td style={{ padding: '1rem' }}><span className="text-gold">{caseItem.status}</span></td>
                        <td style={{ padding: '1rem' }}>{caseItem.next_session_date || 'غير محدد'}</td>
                        <td style={{ padding: '1rem' }}>
                          <button className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
                            <Edit2 size={14} /> تعديل
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
