import { Link, useNavigate } from 'react-router-dom';
import { getCurrentRole, logout } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = getCurrentRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Nếu chưa đăng nhập thì không hiện Navbar
  if (!token) return null;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2c3e50',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
        English Center
      </Link>
      <Link to ="/my-courses" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
        Khóa học của tôi
      </Link>
      <Link to ="/courses" style={{ color: 'white', textDecoration: 'none', fontWeight: 700 }}>
        Khóa học
      </Link>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        
        
        {/* Nếu là Admin thì hiện thêm các nút quản trị */}
        {role === 'admin' && (
          <>
          <Link to="/admin/users" style={{ color: '#ffc107', textDecoration: 'none' }}>
            Quản lý Học viên
          </Link>

          <Link to="/courses/manage" style={{ color: '#ffc107', textDecoration: 'none' }}>
            Quản lý Khóa học
          </Link>
          </>
        )}

        {/* Nếu là Giáo viên thì hiện menu giáo viên */}
        {role === 'teacher' && (
          <Link to="/teacher/schedule" style={{ color: '#17a2b8', textDecoration: 'none' }}>
            Lịch dạy
          </Link>
        )}

        <button 
          onClick={handleLogout}
          style={{
            padding: '6px 12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}