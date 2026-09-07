import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';

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
      
      //2. Thêm toán tử optional chaining (?.) để phòng hờ các cấu trúc response khác nhau
      const token = response.token || response.data?.token;
      // Lấy role từ thông tin user trả về (tùy theo cấu trúc interceptor của bạn)
      const role = response.role || response.data?.role;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setMessage('Đăng nhập thành công! Đang vào hệ thống...');
      
      // 3. Chuyển hướng người dùng sang trang Dashboard
      setTimeout(() => {
        navigate('/dashboard');
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
    </div>
  );
}