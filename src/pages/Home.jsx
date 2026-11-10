import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConsultationModal from '../components/ConsultationModal';
import heroImage from '../assets/Home/men-home.png';
import stepOneImage from '../assets/Home/card-step-1.png';
import stepTwoImage from '../assets/Home/card-step-2.png';
import stepThreeImage from '../assets/Home/Card-step-3.png';
import stepFourImage from '../assets/Home/Card-step-4.png';
import speakingImage from '../assets/courses/giao-tiep.webp';
import ieltsImage from '../assets/courses/ielts.png';
import toeicImage from '../assets/courses/toeic.png';
import skillsImage from '../assets/courses/4-ky-nang.webp';
import './Home.css';

const consultationSteps = [
  { number: '01', title: 'Kiểm tra trình độ', description: 'Bài test ngắn giúp bạn hiểu rõ điểm mạnh và điều cần cải thiện.', image: stepOneImage },
  { number: '02', title: 'Xác định mục tiêu', description: 'Cùng chuyên gia chọn mục tiêu phù hợp với học tập, công việc và cuộc sống.', image: stepTwoImage },
  { number: '03', title: 'Nhận lộ trình riêng', description: 'Lịch học và nội dung được thiết kế theo thời gian và năng lực của bạn.', image: stepThreeImage },
  { number: '04', title: 'Bắt đầu tiến bộ', description: 'Học thực hành, nhận phản hồi và theo dõi kết quả qua từng tuần.', image: stepFourImage }
];

const courses = [
  { title: 'Tiếng Anh giao tiếp', level: 'Mất gốc đến tự tin', image: speakingImage, color: 'coral' },
  { title: 'IELTS Foundation', level: 'Nền tảng vững chắc', image: ieltsImage, color: 'blue' },
  { title: 'TOEIC thực chiến', level: 'Mục tiêu 450 - 750+', image: toeicImage, color: 'gold' },
  { title: 'Tiếng Anh 4 kỹ năng', level: 'Nghe - Nói - Đọc - Viết', image: skillsImage, color: 'green' }
];

const testimonials = [
  { quote: 'Mình đã tự tin giao tiếp hơn hẳn sau vài tuần. Lộ trình rõ ràng, giáo viên sửa rất sát.', name: 'Minh Anh', detail: 'Học viên khóa Giao tiếp' },
  { quote: 'Các buổi học nhiều thực hành nên không bị nhàm chán. Mình biết chính xác hôm nay cần học gì.', name: 'Hoàng Nam', detail: 'Học viên khóa IELTS' },
  { quote: 'Từ mất gốc đến làm bài TOEIC tốt hơn rất nhiều. Đội ngũ hỗ trợ nhiệt tình và dễ trao đổi.', name: 'Thu Hà', detail: 'Học viên khóa TOEIC' }
];

export default function Home() {
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);

  return (
    <div className="home-page">
      {!isLoggedIn && (
        <>
          <div className="home-announcement">🎁 Tặng bài kiểm tra đầu vào miễn phí cho học viên mới <button type="button" onClick={openConsultation}>Đăng ký ngay →</button></div>
          <header className="home-header">
            <Link className="home-logo" to="/">Next<span>Step</span></Link>
            <nav className="home-nav" aria-label="Điều hướng chính">
              <a href="#about">Về chúng tôi</a>
              <a href="#courses">Khóa học</a>
              <a href="#consultation">Lộ trình học</a>
              <a href="#reviews">Học viên nói gì</a>
            </nav>
            <div className="home-header-actions">
              <Link className="home-login-link" to="/login">Đăng nhập</Link>
              <Link className="home-register-button" to="/register">Đăng ký học</Link>
            </div>
          </header>
        </>
      )}

      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <span className="home-kicker">NEXTSTEP · HỌC ĐỂ SỬ DỤNG ĐƯỢC</span>
            <h1>Tiếng Anh tốt hơn, <em>tự tin hơn.</em></h1>
            <p>Chương trình học thực tế, lộ trình cá nhân hóa và đội ngũ giáo viên tận tâm giúp bạn biến mục tiêu tiếng Anh thành kết quả.</p>
            <div className="home-hero-actions">
              <Link className="home-primary-button" to="/courses">Khám phá khóa học <span>→</span></Link>
              <button className="home-text-link" type="button" onClick={openConsultation}>Nhận tư vấn miễn phí <span>↗</span></button>
            </div>
            <div className="home-hero-proof">
              <div className="home-avatar-stack"><i>MA</i><i>HN</i><i>TH</i><b>+</b></div>
              <div><strong>4.9/5 <span>★★★★★</span></strong><small>Hơn 1.000 học viên tin chọn</small></div>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="home-hero-orb" />
            <div className="home-hero-grid" />
            <img src={heroImage} alt="Học viên học tiếng Anh tại NextStep" />
            <span className="home-floating-card home-floating-card-top">✦ Học thực tế mỗi ngày</span>
            <span className="home-floating-card home-floating-card-bottom">✓ Lộ trình của riêng bạn</span>
          </div>
        </section>

        <section className="home-trust-strip" aria-label="Điểm nổi bật">
          <div><strong>1.000+</strong><span>Học viên đang học</span></div>
          <div><strong>4.9/5</strong><span>Đánh giá trung bình</span></div>
          <div><strong>15+</strong><span>Giáo viên tận tâm</span></div>
          <div><strong>95%</strong><span>Học viên tiến bộ</span></div>
        </section>

        <section className="home-section home-about" id="about">
          <div className="home-section-heading">
            <span className="home-kicker">VÌ SAO CHỌN NEXTSTEP</span>
            <h2>Một môi trường học tập tạo ra thay đổi thật.</h2>
          </div>
          <div className="home-about-copy">
            <p>Chúng tôi tin rằng ai cũng có thể sử dụng tiếng Anh tự tin nếu có phương pháp đúng và người đồng hành phù hợp.</p>
            <div className="home-feature-list">
              <div><b>01</b><span><strong>Học chủ động</strong><small>Thực hành nhiều hơn, nhớ lâu hơn.</small></span></div>
              <div><b>02</b><span><strong>Đo lường tiến bộ</strong><small>Biết mình đang ở đâu sau mỗi chặng.</small></span></div>
              <div><b>03</b><span><strong>Đồng hành tận tâm</strong><small>Luôn có giáo viên và cố vấn hỗ trợ.</small></span></div>
            </div>
          </div>
        </section>

        <section className="home-consultation" id="consultation">
          <div className="home-section-heading home-section-heading-light">
            <span className="home-kicker">BẮT ĐẦU ĐÚNG CÁCH</span>
            <h2>4 bước để chạm tới mục tiêu tiếng Anh.</h2>
            <p>Không học lan man. Bạn sẽ biết mình cần gì và bắt đầu từ đâu.</p>
          </div>
          <div className="home-step-grid">
            {consultationSteps.map((step) => (
              <article className="home-step-card" key={step.number}>
                <img src={step.image} alt="" /><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p>
              </article>
            ))}
          </div>
          <button className="home-light-button" type="button" onClick={openConsultation}>Đăng ký tư vấn miễn phí <span>→</span></button>
        </section>

        <section className="home-section home-courses" id="courses">
          <div className="home-section-heading home-heading-row">
            <div><span className="home-kicker">CHƯƠNG TRÌNH ĐÀO TẠO</span><h2>Chọn khóa học phù hợp với bạn.</h2></div>
            <Link className="home-outline-link" to="/courses">Xem tất cả khóa học →</Link>
          </div>
          <div className="home-course-grid">
            {courses.map((course) => (
              <Link className={`home-course-card home-course-card-${course.color}`} to="/courses" key={course.title}>
                <div className="home-course-image"><img src={course.image} alt="" /></div>
                <div className="home-course-content"><span>{course.level}</span><h3>{course.title}</h3><b>Xem chi tiết <i>↗</i></b></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-reviews" id="reviews">
          <div className="home-section-heading"><span className="home-kicker">CẢM NHẬN HỌC VIÊN</span><h2>Mỗi bước tiến đều đáng tự hào.</h2></div>
          <div className="home-review-grid">
            {testimonials.map((item) => <article className="home-review-card" key={item.name}><div className="home-review-stars">★★★★★</div><p>“{item.quote}”</p><strong>{item.name}</strong><small>{item.detail}</small></article>)}
          </div>
        </section>

        <section className="home-cta">
          <span className="home-kicker">SẴN SÀNG BẮT ĐẦU?</span>
          <h2>Đừng chỉ học tiếng Anh.<br /><em>Hãy sử dụng nó.</em></h2>
          <p>Để lại thông tin, chúng tôi sẽ giúp bạn chọn lộ trình phù hợp nhất.</p>
          <button className="home-primary-button" type="button" onClick={openConsultation}>Nhận tư vấn miễn phí <span>→</span></button>
        </section>
      </main>

      <footer className="home-footer">
        <strong>Next<span>Step</span></strong><p>Học để sử dụng được.</p><small>© 2026 NextStep</small>
      </footer>

      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </div>
  );
}
