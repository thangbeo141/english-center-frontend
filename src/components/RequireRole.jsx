import { Navigate, Outlet } from 'react-router-dom';

// Trạm gác này nhận vào một mảng chứa các quyền được phép đi qua
export default function RequireRole({ allowedRoles }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Ví dụ: 'student', 'teacher', hoặc 'admin'

  // 1. Chưa đăng nhập -> Ra chuồng gà (Login)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Nếu quyền của user KHÔNG nằm trong danh sách cho phép -> Mời về trang chủ
  if (!allowedRoles.includes(role)) {
    console.warn(`Tài khoản ${role} đang cố truy cập trái phép!`);
    return <Navigate to="/dashboard" replace />; 
  }

  // 3. Đúng người, đúng quyền -> Mở cổng!
  return <Outlet />;
}