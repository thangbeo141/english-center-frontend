import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import RequireRole from './components/RequireRole';
import Layout from './components/Layout'; // <-- Import Layout chung vào
import './App.css';
import CoursesManagement from './pages/CoursesManagement';
import CourseList from './pages/CourseList';
import MyCourses from './pages/MyCourses';
import TeacherSchedule from './pages/TeacherSchedule';
import Profile from './pages/Profile';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Routes>
      {/* 🟢 TRANG CHỦ (Navbar tự ẩn nếu chưa đăng nhập) */}
      {/* 🔵 KHU VỰC DÙNG CHUNG (Navbar tự ẩn nếu chưa đăng nhập) */}
      <Route element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        
        {/* Dành cho mọi user đã đăng nhập */}
        <Route element={<RequireRole allowedRoles={['admin', 'teacher', 'student']} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />
        </Route>

        {/* Khu vực Admin */}
        <Route element={<RequireRole allowedRoles={['admin']} />}>
          <Route path="/courses/manage" element={<CoursesManagement />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/revenue" element={<h2>Báo cáo Doanh thu</h2>} />
        </Route>

        {/* Lãnh địa Giáo viên */}
        <Route element={<RequireRole allowedRoles={['teacher']} />}>
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/grading" element={<h2>Chấm điểm học viên</h2>} />
        </Route>

      </Route>

      {/* Dashboard cũ được gộp vào trang chủ */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;