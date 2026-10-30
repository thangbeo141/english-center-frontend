import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/api'; // Import trạm kiểm soát Axios

export default function Register() {
  // 1. Khởi tạo State để lưu trữ dữ liệu người dùng nhập
  const [formData, setFormData] = useState({
    fullName: '', // Chú ý: Bắt buộc viết hoa chữ N để khớp với Backend Node.js
    email: '',
    password: ''
  });
  
  // State để hiển thị thông báo thành công hoặc lỗi
  const [message, setMessage] = useState('');
  
  // Công cụ chuyển trang tự động của React Router
  const navigate = useNavigate();

  // 2. Hàm xử lý khi người dùng gõ vào các ô input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Hàm xử lý khi bấm nút "Đăng ký"
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // 1. Kiểm tra định dạng Email chuẩn bằng Regex (Bắt buộc phải có đuôi rõ ràng như .com, .vn)
    // Chỉ cho phép kết thúc bằng .com, .vn, hoặc .edu.vn
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|vn|edu\.vn)$/i;
    if (!emailRegex.test(formData.email)) {
      setMessage('❌ Email không đúng định dạng (ví dụ: ten@gmail.com)');
      return; // Cắt luồng luôn, không cho chạy xuống gọi API bên dưới nữa
    }
    setMessage('Đang xử lý...');

    try {
      // Gửi nguyên cục formData xuống API /auth/register
      await apiClient.post('/auth/register', formData);
      
      setMessage('Đăng ký thành công! Đang chuyển hướng...');
      
      // Đăng ký xong thì tự động đẩy người dùng sang trang Đăng nhập sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      // Thêm dòng này để in toàn bộ gốc rễ cái lỗi ra
      console.log("Chi tiết lỗi thực sự:", error); 
      
      const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!';
      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2c3e50', textDecoration: 'none' }}>
        🏠 Quay về Trang chủ
      </Link>
      <h2>Đăng ký Học viên mới</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Họ và tên:</label><br />
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label>Mật khẩu:</label><br />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Đăng ký
        </button>
      </form>

      {/* Khu vực hiển thị thông báo */}
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold', color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}
      <p style={{ marginTop: '20px' }}>
        Bạn đã có tài khoản?{' '}
        <Link to="/login">Đăng nhập tại đây</Link>
      </p>
    </div>
  );
}