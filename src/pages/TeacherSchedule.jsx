import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import CourseCard from '../components/CousesCard';

const TeacherSchedule = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getTeachingCourses();

        
        setCourses(data);
      } catch (error) {
        console.error('Lỗi khi lấy lịch dạy:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleManageClass = (courseId) => {
    alert(`Chức năng xem học viên và chấm điểm cho lớp ${courseId} sẽ nằm ở đây.`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lịch dạy của tôi</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              buttonText="Quản lý lớp" 
              buttonColor="#17a2b8"
              onButtonClick={handleManageClass} 
            />
          ))
        ) : (
          <p>Bạn chưa được phân công giảng dạy khóa học nào.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherSchedule;