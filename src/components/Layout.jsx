import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import nextStepBanner from '../assets/Home/69b85c99-8690-4722-a8cf-2fc981a019a6.jpg';
import './Layout.css';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="site-banner">
        <img src={nextStepBanner} alt="Tiếng Anh không khó vì có NextStep" />
      </div>
      {/* Nơi các trang con tự động hiển thị */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}