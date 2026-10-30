import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import './Profile.css';

const emptyForm = {
  fullName: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const roleLabels = {
  admin: 'Quản trị viên',
  teacher: 'Giáo viên',
  student: 'Học viên'
};

export default function Profile() {
  const [form, setForm] = useState(emptyForm);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State bật/tắt chỉnh sửa
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await apiClient.get('/auth/me');
        const profile = response.user;
        setUser(profile);
        setForm((current) => ({ ...current, fullName: profile.fullName, email: profile.email }));
      } catch (error) {
        if ([401, 403].includes(error.response?.status)) {
          navigate('/login', { replace: true });
          return;
        }
        setStatus({ type: 'error', message: error.response?.data?.message || 'Không thể tải hồ sơ.' });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleCancel = () => {
    // Hoàn tác dữ liệu nhập về đúng với user hiện tại
    setForm({
      ...emptyForm,
      fullName: user.fullName,
      email: user.email
    });
    setStatus({ type: '', message: '' });
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Mật khẩu xác nhận không khớp.' });
      return;
    }

    setSaving(true);
    try {
      const response = await apiClient.put('/auth/me', {
        fullName: form.fullName,
        email: form.email,
        currentPassword: form.currentPassword || undefined,
        newPassword: form.newPassword || undefined
      });
      setUser(response.user);
      setForm((current) => ({
        ...current,
        fullName: response.user.fullName,
        email: response.user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setStatus({ type: 'success', message: response.message });
      setIsEditing(false); // Đóng form sau khi lưu thành công
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Cập nhật hồ sơ thất bại.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="profile-state">Đang tải hồ sơ...</div>;

  return (
    <section className="profile-page">
      <div className="profile-header">
        <div>
          <p className="profile-eyebrow">TÀI KHOẢN CỦA BẠN</p>
          <h1>Hồ sơ cá nhân</h1>
          <p className="profile-subtitle">Quản lý thông tin tài khoản và bảo mật của bạn.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  {user && <div className="profile-avatar">{user.fullName?.charAt(0).toUpperCase()}</div>}
  {!isEditing && (
    <button 
      type="button" 
      onClick={() => setIsEditing(true)}
      style={{
        border: 'none', borderRadius: '8px', padding: '8px 16px',
        backgroundColor: '#edf4ff', color: '#2979ff', fontWeight: '700', 
        cursor: 'pointer', transition: '0.2s', fontSize: '14px'
      }}
    >
      Chỉnh sửa hồ sơ
    </button>
  )}
</div>
      </div>

      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-card-heading">
          <div>
            <h2>Thông tin cơ bản</h2>
            <p>Những thông tin này được sử dụng trong hệ thống English Center.</p>
          </div>
          {user && <span className="profile-role">{roleLabels[user.role] || user.role}</span>}
        </div>

        {!isEditing ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
    <div>
      <span style={{ color: '#728096', fontSize: '13px', fontWeight: '700', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Họ và tên</span>
      <span style={{ color: '#152238', fontSize: '16px', fontWeight: '500' }}>{user?.fullName}</span>
    </div>
    <div>
      <span style={{ color: '#728096', fontSize: '13px', fontWeight: '700', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Email</span>
      <span style={{ color: '#152238', fontSize: '16px', fontWeight: '500' }}>{user?.email}</span>
    </div>
    <div>
      <span style={{ color: '#728096', fontSize: '13px', fontWeight: '700', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Mật khẩu</span>
      <span style={{ color: '#152238', fontSize: '16px', fontWeight: '500' }}>********</span>
    </div>
  </div>
) : (
          /* CHẾ ĐỘ CHỈNH SỬA (HIỂN THỊ INPUT FORM) */
          <>
            <div className="profile-grid">
              <label>
                Họ và tên
                <input name="fullName" value={form.fullName} onChange={handleChange} required maxLength={100} />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} disabled style={{ backgroundColor: '#f4f6f8', cursor: 'not-allowed' }} />
              </label>
            </div>

            <div className="profile-divider" />
            
            <div className="profile-card-heading">
              <div>
                <h2>Đổi mật khẩu</h2>
                <p>Để trống nếu bạn không muốn thay đổi mật khẩu.</p>
              </div>
            </div>
            
            <div className="profile-grid">
              <label>
                Mật khẩu hiện tại
                <input name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} autoComplete="current-password" />
              </label>
              <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <label>
                  Mật khẩu mới
                  <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} minLength={6} autoComplete="new-password" />
                </label>
                <label>
                  Xác nhận mật khẩu mới
                  <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
                </label>
              </div>
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel} disabled={saving}>Hủy</button>
              <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
            </div>
          </>
        )}

        {/* Thông báo trạng thái đặt ra ngoài logic isEditing để cập nhật xong vẫn thấy thông báo */}
        {status.message && <div className={`profile-message ${status.type}`} style={{ marginTop: '20px' }}>{status.message}</div>}
      </form>
    </section>
  );
}