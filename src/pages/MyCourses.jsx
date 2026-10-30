import React, {useState, useEffect} from "react";

import { courseService } from "../services/courseService";
import CourseCard from "../components/CousesCard";
const MyCourses = () => {
    const [myCourses, setMyCourses] = useState([]);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const response = await courseService.getMyCourses();
            setMyCourses(response);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách khóa học của tôi:', error);
        }
    };    
    <Route path="/teacher/schedule" element={<TeacherSchedule />} />

    return (
        <div style={{ padding: '20px' }}>
            <h2>Khóa học của tôi</h2>
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
        </div>
    );
};

export default MyCourses;