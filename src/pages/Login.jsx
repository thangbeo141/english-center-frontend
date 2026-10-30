import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import { decodeToken } from '../utils/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Đang kiểm tra thông tin...');

    try {
      // 1. Gửi yêu cầu đăng nhập xuống Backend
      const response = await apiClient.post('/auth/login', formData);
      const result = response.data;
      const token = result.data?.token;
      
      if (!token) {
        throw new Error("Không nhận được Token từ server!");
      }

      const userRole = decodeToken(token)?.role;
      if (!userRole) {
        throw new Error('Token không chứa role hợp lệ!');
      }
      
      // Lưu vào ví
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      setMessage('Đăng nhập thành công! Đang vào hệ thống...');
      
      // 3. ĐIỀU HƯỚNG THÔNG MINH
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin/users'); // Sếp về thẳng phòng Sếp
        } else if (userRole === 'teacher') {
          navigate('/teacher/schedule'); // Giáo viên về phòng Giáo viên
        } else {
          navigate('/dashboard'); // Học viên về sân chung
        }
      }, 1500);
      
    } catch (error) {
      
      // THÊM 2 DÒNG NÀY VÀO ĐỂ BẮT TẬN TAY LỖI:
      console.error("CHI TIẾT LỖI TỪ AXIOS:", error);
      console.log("URL ĐANG GỌI LÀ:", apiClient.defaults.baseURL);

      const errorMsg = error.response?.data?.message || 'Lỗi kết nối đến máy chủ!';
      setMessage(`❌ ${errorMsg}`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#2c3e50', textDecoration: 'none' }}>
        🏠 Quay về Trang chủ
      </Link>
      <h2>Đăng nhập Hệ thống</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          Đăng nhập
        </button>
      </form>

      {message && <p style={{ marginTop: '20px', fontWeight: 'bold', color: message.includes('❌') ? 'red' : 'green' }}>{message}</p>}
      <p style={{ marginTop: '20px' }}>
        Bạn chưa có tài khoản?{' '}
        <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
}