import { Link, useNavigate } from 'react-router-dom';
import { getCurrentRole, logout } from '../utils/auth';
import './Navbar.css';

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
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <Link className="app-brand" to="/">
          <span className="app-brand-mark">N</span>
          <span>Next<span className="app-brand-accent">Step</span></span>
        </Link>
      
        <div className="app-navbar-links">
          <Link to="/courses">Khóa học</Link>
          {role === 'student' && <Link to="/my-courses">Khóa học của tôi</Link>}

          {role === 'teacher' && <Link className="app-role-link teacher-link" to="/teacher/schedule">Lịch dạy</Link>}
          {role === 'admin' && (
            <div className="app-admin-links">
              <Link className="app-role-link admin-link" to="/admin/users">Học viên</Link>
              <Link className="app-role-link admin-link" to="/courses/manage">Quản lý khóa học</Link>
            </div>
          )}
        </div>

        <div className="app-navbar-actions">
          <Link className="app-profile-button" to="/profile">Hồ sơ của tôi</Link>
          <button className="app-logout-button" onClick={handleLogout}>Đăng xuất</button>
        </div>
      </div>
    </nav>
  );
}