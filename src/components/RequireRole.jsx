import { Navigate, Outlet } from 'react-router-dom';
import { decodeToken } from '../utils/auth';

export default function RequireRole({ allowedRoles }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const userRole = decodeToken(token)?.role;

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}