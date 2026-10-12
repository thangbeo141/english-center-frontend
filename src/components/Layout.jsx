import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div>
      <Navbar />
      {/* Nơi các trang con (Dashboard, AdminDashboard...) tự động nhảy vào đây */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}