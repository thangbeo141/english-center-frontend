import { useEffect, useState } from 'react';
import { courseService } from '../services/courseService';
import './ClassStudentsPanel.css';

export default function ClassStudentsPanel({ course, onClose }) {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let active = true;

    const loadStudents = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const result = await courseService.getStudentsByCourse(course.id);

        if (active) {
          setStudents(result.data);
          setTotal(result.total);
        }
      } catch (error) {
        if (active) {
          setErrorMessage(
            error.response?.data?.message || 'Không thể tải danh sách học viên.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadStudents();

    return () => {
      active = false;
    };
  }, [course.id]);

  return (
    <div className="class-panel-backdrop" role="presentation" onClick={onClose}>
      <section
        className="class-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="class-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="class-panel-header">
          <div>
            <p className="class-panel-eyebrow">QUẢN LÝ LỚP</p>
            <h2 id="class-panel-title">{course.title}</h2>
            <p className="class-panel-count">
              {loading ? 'Đang tải...' : `${total} học viên`}
            </p>
          </div>
          <button className="class-panel-close" type="button" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        {loading && <div className="class-panel-state">Đang tải danh sách học viên...</div>}
        {!loading && errorMessage && <div className="class-panel-error">{errorMessage}</div>}
        {!loading && !errorMessage && students.length === 0 && (
          <div className="class-panel-state">Lớp hiện chưa có học viên.</div>
        )}
        {!loading && !errorMessage && students.length > 0 && (
          <div className="class-students-table-wrap">
            <table className="class-students-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td className="class-student-name">{student.name || student.full_name}</td>
                    <td>{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
