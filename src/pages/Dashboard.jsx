import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import { logout } from '../utils/auth';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Gọi một API bất kỳ có yêu cầu xác thực ở Backend (bạn thay đổi URL cho phù hợp với route của bạn)
        // Ví dụ bạn có API lấy thông tin: router.get('/me', verifyToken, authController.getMe)
        // Tạm thời ở đây mình gọi thử một API courses hoặc API học viên
        const response = await apiClient.get('/auth/me'); 
        setUserData(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        // Nếu Token hết hạn hoặc không hợp lệ, đuổi về trang Đăng nhập
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Nút Đăng xuất
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải dữ liệu...</h3>;

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>👋 Chào mừng đến với Bảng điều khiển</h2>
      
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
        <p><strong>Trạng thái hệ thống:</strong> Đã kết nối Token thành công 🟢</p>
        {/* In tạm dữ liệu lấy được ra màn hình */}
        <pre style={{ background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(userData, null, 2)}
        </pre>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Đăng xuất
      </button>
    </div>
  );
}