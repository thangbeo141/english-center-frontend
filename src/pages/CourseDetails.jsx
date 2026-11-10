import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getCurrentRole } from '../utils/auth';
import { courseService } from '../services/courseService';
import { enrollmentService } from '../services/enrollmentService';
import ConsultationModal from '../components/ConsultationModal';
import './CourseDetails.css';

const courseContent = {
  IELTS: {
    label: 'LUYỆN THI IELTS',
    audience: 'Học viên muốn xây dựng lộ trình rõ ràng và chinh phục mục tiêu IELTS 7.5+.',
    outcomes: ['Làm chủ 4 kỹ năng theo cấu trúc đề thi', 'Biết cách tự học và sửa lỗi hiệu quả', 'Tăng khả năng xử lý đề và phân bổ thời gian'],
    curriculum: ['Củng cố nền tảng từ vựng và ngữ pháp', 'Phát triển Listening, Reading, Speaking, Writing', 'Luyện đề theo band điểm và thi thử định kỳ'],
    accent: 'blue'
  },
  TOEIC: {
    label: 'LUYỆN THI TOEIC',
    audience: 'Sinh viên và người đi làm cần chứng chỉ TOEIC phục vụ học tập, tuyển dụng hoặc thăng tiến.',
    outcomes: ['Nắm cấu trúc và dạng câu hỏi thường gặp', 'Mở rộng từ vựng theo chủ đề công việc', 'Cải thiện tốc độ nghe, đọc và chiến thuật làm bài'],
    curriculum: ['Xây dựng nền tảng ngữ âm và ngữ pháp', 'Luyện Part 1-7 theo từng kỹ năng', 'Làm đề tổng hợp và phân tích điểm yếu'],
    accent: 'orange'
  },
  '4 kỹ năng': {
    label: 'TIẾNG ANH TOÀN DIỆN',
    audience: 'Người học muốn sử dụng tiếng Anh tự tin trong học tập, công việc và giao tiếp hàng ngày.',
    outcomes: ['Phát triển cân bằng nghe, nói, đọc, viết', 'Giao tiếp tự nhiên trong tình huống thực tế', 'Hình thành thói quen học tập chủ động'],
    curriculum: ['Phát âm và mẫu câu giao tiếp nền tảng', 'Thực hành hội thoại theo chủ đề', 'Đọc hiểu, viết email và trình bày ý tưởng'],
    accent: 'green'
  },
  GIAO: {
    label: 'TIẾNG ANH GIAO TIẾP',
    audience: 'Người mới bắt đầu hoặc người bận rộn muốn cải thiện phản xạ giao tiếp thực tế.',
    outcomes: ['Tự tin giới thiệu và trao đổi thông tin', 'Nghe hiểu các đoạn hội thoại thông dụng', 'Phản xạ tốt hơn qua hoạt động thực hành'],
    curriculum: ['Phát âm và từ vựng thiết yếu', 'Giao tiếp trong đời sống và du lịch', 'Thực hành hội thoại và thuyết trình ngắn'],
    accent: 'purple'
  },
  default: {
    label: 'KHÓA HỌC TIẾNG ANH',
    audience: 'Học viên muốn nâng cao năng lực tiếng Anh với lộ trình thực tế và dễ theo dõi.',
    outcomes: ['Học theo mục tiêu rõ ràng', 'Được thực hành qua tình huống thực tế', 'Theo dõi tiến bộ qua từng giai đoạn'],
    curriculum: ['Kiểm tra và củng cố nền tảng', 'Học kiến thức theo chủ đề', 'Ôn tập và đánh giá kết quả'],
    accent: 'blue'
  }
};

function getCourseContent(title = '') {
  const normalizedTitle = title.toUpperCase();
  if (normalizedTitle.includes('IELTS')) return courseContent.IELTS;
  if (normalizedTitle.includes('TOEIC')) return courseContent.TOEIC;
  if (normalizedTitle.includes('4 KỸ NĂNG')) return courseContent['4 kỹ năng'];
  if (normalizedTitle.includes('GIAO TIẾP')) return courseContent.GIAO;
  return courseContent.default;
}

export default function CourseDetails() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const role = getCurrentRole();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConsultation, setShowConsultation] = useState(searchParams.get('consultation') === '1');
  const [openFaq, setOpenFaq] = useState(0);
  const content = useMemo(() => getCourseContent(course?.title), [course?.title]);

  useEffect(() => {
    let active = true;
    const loadCourse = async () => {
      try {
        const coursesResult = await courseService.getAllCourses();
        const foundCourse = coursesResult.data.find((item) => String(item.id) === String(courseId));
        if (!foundCourse) throw new Error('Không tìm thấy khóa học.');

        let enrolled = false;
        if (role === 'student') {
          const myCoursesResult = await courseService.getMyCourses();
          enrolled = myCoursesResult.data.some((item) => String(item.id) === String(courseId));
        }
        if (active) {
          setCourse(foundCourse);
          setIsEnrolled(enrolled);
        }
      } catch (error) {
        console.error('Lỗi khi tải chi tiết khóa học:', error);
        if (active) setErrorMessage(error.response?.data?.message || error.message || 'Không thể tải thông tin khóa học.');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadCourse();
    return () => { active = false; };
  }, [courseId, role]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setErrorMessage('');
    try {
      await enrollmentService.enroll(course.id);
      setIsEnrolled(true);
    } catch (error) {
      console.error('Lỗi khi đăng ký khóa học:', error);
      setErrorMessage(error.response?.data?.message || 'Không thể đăng ký khóa học.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <p className="course-page-state">Đang tải thông tin khóa học...</p>;
  if (errorMessage && !course) {
    return <div className="course-page-state"><p className="course-error">{errorMessage}</p><Link to="/courses">Quay lại danh sách khóa học</Link></div>;
  }

  return (
    <div className="course-details-page">
      <section className={`course-hero course-hero-${content.accent}`}>
        <div className="course-hero-inner">
          <Link className="course-back-link" to="/courses">← Tất cả khóa học</Link>
          <div className="course-hero-content">
            <div>
              <span className="course-eyebrow">{content.label}</span>
              <h1>{course.title}</h1>
              <p>{course.description || 'Lộ trình học thực tế, dễ theo dõi và phù hợp với mục tiêu của bạn.'}</p>
              <div className="course-hero-actions">
                {role === 'student' && !isEnrolled && (
                  <button className="course-primary-button" type="button" onClick={handleEnroll} disabled={enrolling}>
                    {enrolling ? 'Đang đăng ký...' : 'Đăng ký khóa học'}
                  </button>
                )}
                {isEnrolled && <span className="course-enrolled-badge">✓ Bạn đang học khóa này</span>}
                <button className="course-outline-button" type="button" onClick={() => setShowConsultation(true)}>Nhận tư vấn</button>
              </div>
              {course.price && <strong className="course-price">{Number(course.price).toLocaleString('vi-VN')} VNĐ</strong>}
              {errorMessage && <p className="course-error">{errorMessage}</p>}
            </div>
            <div className="course-hero-illustration" aria-hidden="true">
              <span>EN</span><strong>{content.accent === 'orange' ? '650+' : content.accent === 'blue' ? '7.5+' : 'A+'}</strong>
            </div>
          </div>
        </div>
      </section>

      <main className="course-content">
        <section className="course-stats">
          <div><strong>4</strong><span>Kỹ năng phát triển</span></div>
          <div><strong>100%</strong><span>Học theo lộ trình</span></div>
          <div><strong>1:1</strong><span>Tư vấn mục tiêu</span></div>
        </section>

        <section className="course-section course-two-columns">
          <div><span className="section-kicker">LỘ TRÌNH CÁ NHÂN HÓA</span><h2>Khóa học này dành cho ai?</h2></div>
          <p>{content.audience}</p>
        </section>

        <section className="course-section">
          <span className="section-kicker">GIÁ TRỊ NHẬN ĐƯỢC</span>
          <h2>Sau khóa học, bạn có thể làm gì?</h2>
          <div className="course-card-grid">
            {content.outcomes.map((item, index) => <div className="benefit-card" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
          </div>
        </section>

        <section className="course-section curriculum-section">
          <div><span className="section-kicker">CHƯƠNG TRÌNH ĐÀO TẠO</span><h2>Lộ trình học rõ ràng</h2></div>
          <div className="curriculum-list">
            {content.curriculum.map((item, index) => <div className="curriculum-item" key={item}><span>{index + 1}</span><p>{item}</p><b>→</b></div>)}
          </div>
        </section>

        <section className="course-testimonial">
          <span className="quote-mark">“</span>
          <p>Học đúng mục tiêu, thực hành đều đặn và luôn có người đồng hành trong suốt lộ trình.</p>
          <small>NextStep - Học để sử dụng được</small>
        </section>

        <section className="course-section faq-section">
          <span className="section-kicker">GIẢI ĐÁP THẮC MẮC</span>
          <h2>Câu hỏi thường gặp</h2>
          {['Tôi chưa biết trình độ hiện tại, có học được không?', 'Tôi có thể đăng ký tư vấn trước khi đăng ký khóa học không?', 'Sau khi đăng ký, tôi xem khóa học ở đâu?'].map((question, index) => (
            <div className="faq-item" key={question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>
              {openFaq === index && <p>{index === 0 ? 'Bạn sẽ được tư vấn lộ trình phù hợp với mục tiêu và nền tảng hiện tại.' : index === 1 ? 'Có. Hãy bấm “Nhận tư vấn” để gửi thông tin cho trung tâm.' : 'Khóa học đã đăng ký sẽ xuất hiện trong mục “Khóa học của tôi”.'}</p>}
            </div>
          ))}
        </section>
      </main>

      <ConsultationModal isOpen={showConsultation} onClose={() => setShowConsultation(false)} />
    </div>
  );
}
