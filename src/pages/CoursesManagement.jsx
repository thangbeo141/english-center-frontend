import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { teacherService } from '../services/teacherService';
import CourseCard from '../components/CousesCard';
const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    teacherId: ''
  });

  // Tự động lấy dữ liệu khi trang vừa render
  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khóa học:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await teacherService.getAllTeachers();
      setTeachers(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách giáo viên:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Tạo khóa học mới
      const createdCourse = await courseService.createCourse({
        title: formData.title,
        description: formData.description,
        price: formData.price
      });

      // 2. Nếu có chọn giáo viên, gọi API phân công
      if (formData.teacherId && createdCourse.id) {
        await courseService.assignTeacher(createdCourse.id, formData.teacherId);
      }

      alert('Thêm khóa học thành công!');
      setFormData({ title: '', description: '', price: '', teacherId: '' }); // Reset form
      fetchCourses(); // Cập nhật lại bảng
    } catch (error) {
      console.error('Lỗi khi thêm khóa học:', error);
      alert('Có lỗi xảy ra khi tạo khóa học!');
    }
  };

  const handleAssignTeacher = async (courseId, teacherId) => {
    try {
      await courseService.assignTeacher(courseId, teacherId);
      alert('Phân công giáo viên thành công!');
      fetchCourses(); // Cập nhật lại bảng
    } catch (error) {
      console.error('Lỗi khi phân công giáo viên:', error);
      alert('Có lỗi xảy ra khi phân công giáo viên!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý Khóa học & Phân công</h2>

      {/* Form thêm khóa học */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Thêm Khóa học mới</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
          <input 
            type="text" name="title" placeholder="Tên khóa học" required
            value={formData.title} onChange={handleInputChange} 
            style={{ padding: '8px' }}
          />
          <textarea 
            name="description" placeholder="Mô tả khóa học" rows="3"
            value={formData.description} onChange={handleInputChange}
            style={{ padding: '8px' }}
          ></textarea>
          <input 
            type="number" name="price" placeholder="Giá tiền (VNĐ)" required
            value={formData.price} onChange={handleInputChange}
            style={{ padding: '8px' }}
          />
          
          <select 
            name="teacherId" 
            value={formData.teacherId} onChange={handleAssignTeacher}
            style={{ padding: '8px' }}
          >
            <option value="">-- Chọn Giáo viên phụ trách (Tùy chọn) --</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.full_name} ({teacher.email})
              </option>
            ))}
          </select>

          <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
            Thêm Khóa học
          </button>
        </form>
      </div>

      {/* Bảng danh sách khóa học */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#e9ecef' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tên Khóa học</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Giá</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(course => (
              <tr key={course.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{course.price? Number(course.price).toLocaleString('vi-VN') : '0'} VNĐ</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <select 
                    onChange={(e) => handleAssignTeacher(course.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="">-- Chọn Giáo viên --</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.full_name} ({teacher.email})
                      </option>
                    ))}
                  </select>
                  <button onClick={() => alert('Tính năng sửa sẽ cập nhật sau')}>Sửa</button>
                  <button onClick={() => alert('Tính năng xóa sẽ cập nhật sau')} style={{ marginLeft: '5px', color: 'red' }}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>Chưa có khóa học nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;