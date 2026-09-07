import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Kiểm tra xem trong ví (localStorage) có thẻ thông hành (token) chưa
  const token = localStorage.getItem('token');

  // Nếu không có token -> Đuổi cổ về trang Đăng nhập ngay lập tức
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token -> Mở cổng cho đi tiếp vào các trang bên trong (Outlet)
  return <Outlet />;
}