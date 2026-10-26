import React from 'react';

const CourseCard = ({ course, buttonText, onButtonClick, buttonColor = '#007bff', statusText }) => {
  return (
    <div className="course-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: '0', color: '#2c3e50' }}>{course.title}</h3>
      <p style={{ color: '#555', minHeight: '40px' }}>{course.description || 'Chưa có mô tả.'}</p>
      
      {/* Chỉ hiện giá nếu có */}
      {course.price && <p style={{ fontWeight: 'bold', color: '#e74c3c' }}>Giá: {Number(course.price).toLocaleString('vi-VN')} VNĐ</p>}
      
      {/* Dành cho trang MyCourses */}
      {statusText && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}>
          {statusText}
        </div>
      )}

      {/* Dành cho nút Đăng ký / Sửa / Xóa */}
      {buttonText && (
        <button 
          onClick={() => onButtonClick(course.id)}
          style={{ marginTop: '10px', width: '100%', padding: '10px', backgroundColor: buttonColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default CourseCard;