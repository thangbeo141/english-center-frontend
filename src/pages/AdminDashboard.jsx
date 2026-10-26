import { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Trạng thái cho thêm học viên mới
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Trạng thái dùng cho chức năng Sửa tên
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch {
      setError('Không thể tải dữ liệu học viên!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🟢 Hàm THÊM học viên mới
  const handleAddStudent = async (e) => {
    e.preventDefault();// Ngăn form submit reload trang
    if(!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      // Gửi Api POST để thêm học viên mới 
      const newStudent = await studentService.createStudent({
        fullName: newName,
        email: newEmail,
        password: newPassword
      });
      setStudents([...students, newStudent]);
      // Reset form
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      alert('Thêm học viên thành công!');
    } catch (error) {
      console.error(error);
      alert('Lỗi khi thêm học viên ! Có thể email đã tồn tại hoặc kiểm tra lại API Backend.');
    }
  };

  // 🔴 Hàm XÓA học viên
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa học viên này?')) return;
    try {
      // Gọi API xóa (kiểm tra lại route backend nếu cần, ví dụ: /students/:id)
      await studentService.deleteStudent(id);
      
      // Xóa thành công thì lọc cập nhật lại bảng mà không cần load lại trang
      setStudents(students.filter(student => student.id !== id));
      alert('Đã xóa học viên thành công!');
    } catch (error) {
      alert('Lỗi khi xóa học viên! Kiểm tra lại API Backend.');
    }
  };

  // 🟡 Kích hoạt chế độ SỬA
  const startEdit = (student) => {
    setEditingId(student.id);
    setEditName(student.full_name || student.fullName);
  };

  // 🟢 Hàm LƯU tên mới
  const handleSaveEdit = async (id) => {
    if (!editName.trim()) {
      alert("Tên không được để trống!");
      return;
    }
    
    try {
      // Gửi API update (Tên biến 'fullName' phải khớp với req.body bên Backend)
      await studentService.updateStudentName(id, editName);
      
      // Cập nhật lại UI ngay lập tức
      setStudents(students.map(s => 
        s.id === id ? { ...s, full_name: editName } : s
      ));
      setEditingId(null); // Tắt chế độ sửa
      alert('Cập nhật tên thành công!');
    } catch (error) {
      alert('Lỗi khi cập nhật! Kiểm tra lại API Backend.');
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Đang tải dữ liệu... ⏳</h3>;
  if (error) return <h3 style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</h3>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>👑 Bảng điều khiển Quản trị viên</h2>
      
      {/* KHU VỰC FORM THÊM HỌC VIÊN */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h4 style={{ margin: '0 0 15px 0' }}>➕ Thêm Học viên mới</h4>
        <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Họ và tên" 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          />
          <input 
            type="email" 
            placeholder="Địa chỉ Email" 
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px' }}
          />
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Thêm ngay
          </button>
        </form>
      </div>

      <p>Danh sách Học viên đang có trong hệ thống:</p>

      {/* BẢNG DANH SÁCH */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Họ và Tên</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.id}</td>
              
              <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                {editingId === student.id ? (
                  <input 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
                    autoFocus
                  />
                ) : (
                  student.full_name || student.fullName
                )}
              </td>
              
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{student.email}</td>
              
              <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center' }}>
                {editingId === student.id ? (
                  <>
                    <button onClick={() => handleSaveEdit(student.id)} style={{ padding: '6px 12px', marginRight: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Lưu</button>
                    <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(student)} style={{ padding: '6px 12px', marginRight: '5px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                    <button onClick={() => handleDelete(student.id)} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}