import { useEffect, useState } from 'react';
import { courseService } from "../services/courseService";
import CourseCard from "../components/CousesCard";

const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setErrorMessage('');
                const result = await courseService.getMyCourses();
                setMyCourses(result.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách khóa học của tôi:', error);
                setErrorMessage(
                    error.response?.data?.message ||
                    'Không thể tải danh sách khóa học của bạn.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Khóa học của tôi</h2>

            {loading && <p>Đang tải danh sách khóa học...</p>}
            {!loading && errorMessage && (
                <p style={{ color: '#b42318' }}>{errorMessage}</p>
            )}
            {!loading && !errorMessage && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {myCourses.length > 0 ? (
                    myCourses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            statusText="Đang học"
                        />  
                    ))
                ) : (
                    <p>Hiện chưa có khóa học nào để hiển thị.</p>
                )}
                </div>
            )}
        </div>
    );
};

export default MyCourses;