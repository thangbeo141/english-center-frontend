import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import RequireRole from './components/RequireRole';
import Layout from './components/Layout'; // <-- Import Layout chung vào
import './App.css';
import CoursesManagement from './pages/CoursesManagement';
import CourseList from './pages/CourseList';
import MyCourses from './pages/MyCourses';
import TeacherSchedule from './pages/TeacherSchedule';

function App() {
  return (
    <Routes>
      {/* 🟢 KHU VỰC PUBLIC (Không có Navbar) */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* 🔵 KHU VỰC PRIVATE (Tự động có Navbar bọc ở ngoài) */}
      <Route element={<Layout />}>
        
        {/* Dành cho mọi user đã đăng nhập */}
        <Route element={<RequireRole allowedRoles={['admin', 'teacher', 'student']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<h2>Hồ sơ cá nhân chung</h2>} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses" element={<CourseList />} />
        </Route>

        {/* Khu vực Admin */}
        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path="/courses/manage" element={<CoursesManagement />} />
        </Route>

        {/* Lãnh địa Giáo viên */}
        <Route element={<RequireRole allowedRoles={['teacher']} />}>
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/grading" element={<h2>Chấm điểm học viên</h2>} />
        </Route>

        {/* Lãnh địa Admin */}
        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/revenue" element={<h2>Báo cáo Doanh thu</h2>} />
        </Route>

      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;