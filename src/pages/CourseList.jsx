import React, { useState, useEffect } from 'react';
import { getCurrentRole } from '../utils/auth';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import CourseCard from '../components/CousesCard';
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const role = getCurrentRole(); // Lấy role: admin, teacher, hoặc student

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khóa học:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollmentService.enroll(courseId);
      alert('Đăng ký khóa học thành công!');
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      // Bắt lỗi từ backend (ví dụ: đã đăng ký rồi)
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra hoặc bạn đã đăng ký khóa học này rồi.';
      alert(errorMessage);
    }
  };

// Thay thế phần render của CourseList bằng code sau:
return (
  <div style={{ padding: '20px' }}>
    <h2>Danh sách Khóa học</h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
      {courses.length > 0 ? (
        courses.map((course) => ( // Thêm hàm map() để duyệt qua từng khóa học
          <CourseCard
            key={course.id}
            course={course} // Sửa 'courses' thành 'course'
            buttonText={role === 'student' ? 'Đăng ký' : null}
            buttonColor="#28a745"
            onButtonClick={handleEnroll}
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