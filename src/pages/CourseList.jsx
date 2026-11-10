import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentRole } from '../utils/auth';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import CourseCard from '../components/CousesCard';
import './CourseList.css';
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const role = getCurrentRole(); // Lấy role: admin, teacher, hoặc student

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const result = await courseService.getAllCourses();
        setCourses(result.data);

        if (role === 'student') {
          const myCoursesResult = await courseService.getMyCourses();
          setEnrolledCourseIds(myCoursesResult.data.map((course) => course.id));
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách khóa học:', error);
      }
    };

    loadCourses();
  }, [role]);

  const handleEnroll = async (courseId) => {
    try {
      await enrollmentService.enroll(courseId);
      setEnrolledCourseIds((currentIds) => [...currentIds, courseId]);
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      // Bắt lỗi từ backend (ví dụ: đã đăng ký rồi)
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra hoặc bạn đã đăng ký khóa học này rồi.';
      alert(errorMessage);
    }
  };

// Thay thế phần render của CourseList bằng code sau:
return (
  <div className="course-list-page">
    <div className="course-list-breadcrumb">
      <Link to="/">Trang chủ</Link>
      <span>»</span>
      <span>Các khóa học của NextStep</span>
    </div>
    <header className="course-list-heading">
      <h1>Các khóa học của NextStep</h1>
      <p>Chọn lộ trình phù hợp để phát triển năng lực tiếng Anh của bạn</p>
    </header>

    <div className="course-list-grid">
      {courses.length > 0 ? (
        courses.map((course) => ( // Thêm hàm map() để duyệt qua từng khóa học
          <CourseCard
            key={course.id}
            course={course} // Sửa 'courses' thành 'course'
            buttonText={role === 'student' && !enrolledCourseIds.includes(course.id) ? 'Đăng ký' : null}
            buttonColor="#28a745"
            onButtonClick={handleEnroll}
            statusText={role === 'student' && enrolledCourseIds.includes(course.id) ? 'Đã đăng ký' : null}
          />
        ))
      ) : (
        <p>Hiện chưa có khóa học nào để hiển thị.</p>
      )}
    </div>
  </div>
);
};

export default CourseList;