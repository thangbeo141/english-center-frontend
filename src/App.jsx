import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RequireRole from './components/RequireRole'; // <-- Import Trạm gác vạn năng

function App() {
  return (
    
      <Routes>
        {/* 🟢 NHÓM 1: Khu vực Public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* 🔵 NHÓM 2: Dành cho TẤT CẢ mọi người đã đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<h2>Hồ sơ cá nhân chung</h2>} />
        </Route>

        {/* 🟠 NHÓM 3: Khu vực CHUNG của Admin & Giáo viên (Học viên cấm vào) */}
        {/* Ví dụ: Cả Admin và Giáo viên đều được xem danh sách khóa học, tài liệu giảng dạy */}
        <Route element={<RequireRole allowedRoles={['admin', 'teacher']} />}>
          <Route path="/courses/manage" element={<h2>Quản lý Khóa học & Tài liệu</h2>} />
        </Route>

        {/* 🟡 NHÓM 4: Lãnh địa RIÊNG của Giáo viên */}
        <Route element={<RequireRole allowedRoles={['teacher']} />}>
          <Route path="/teacher/schedule" element={<h2>Lịch dạy của tôi</h2>} />
          <Route path="/teacher/grading" element={<h2>Chấm điểm học viên</h2>} />
        </Route>

        {/* 🔴 NHÓM 5: Lãnh địa TỐI CAO của Admin */}
        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path="/admin/users" element={<h2>Quản lý tất cả Tài khoản</h2>} />
          <Route path="/admin/revenue" element={<h2>Báo cáo Doanh thu</h2>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    
  );
}

export default App;