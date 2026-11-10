import React from 'react';
import { Link } from 'react-router-dom';
import ieltsImage from '../assets/courses/ielts.png';
import toeicImage from '../assets/courses/toeic.png';
import communicationImage from '../assets/courses/giao-tiep.webp';
import fourSkillsImage from '../assets/courses/4-ky-nang.webp';
import businessImage from '../assets/courses/doanh-nghiep.webp';
import './CourseCard.css';

const courseImages = [
  { keywords: ['IELTS'], image: ieltsImage },
  { keywords: ['TOEIC'], image: toeicImage },
  { keywords: ['4 kỹ năng'], image: fourSkillsImage },
  { keywords: ['giao tiếp'], image: communicationImage },
  { keywords: ['doanh nghiệp', 'công sở'], image: businessImage }
];

function getCourseImage(title = '') {
  const matchedCourse = courseImages.find(({ keywords }) =>
    keywords.some((keyword) => title.toLowerCase().includes(keyword.toLowerCase()))
  );

  return matchedCourse?.image;
}

function getCourseImageClass(title = '') {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes('toeic')) return 'course-card-image--toeic';
  if (normalizedTitle.includes('4 kỹ năng')) return 'course-card-image--four-skills';
  if (normalizedTitle.includes('giao tiếp')) return 'course-card-image--communication';
  return '';
}

const CourseCard = ({ course, buttonText, onButtonClick, buttonColor = '#007bff', statusText }) => {
  const image = getCourseImage(course.title);
  const imageClass = getCourseImageClass(course.title);

  return (
    <article className="course-card">
      <h3 className="course-card-title">
        <Link to={`/courses/${course.id}`}>
          {course.title}
        </Link>
      </h3>
      <p className="course-card-description">{course.description || 'Chưa có mô tả.'}</p>

      {image && (
        <Link className="course-card-image-link" to={`/courses/${course.id}`} aria-label={`Xem ${course.title}`}>
          <img className={`course-card-image ${imageClass}`} src={image} alt="" />
        </Link>
      )}

      <Link className="course-consultation-button" to={`/courses/${course.id}?consultation=1`}>
        <span>Nhận tư vấn</span>
        <span className="course-consultation-arrow" aria-hidden="true">→</span>
      </Link>
      
      {/* Chỉ hiện giá nếu có */}
      {course.price && <p className="course-card-price">Giá: {Number(course.price).toLocaleString('vi-VN')} VNĐ</p>}
      
      {/* Dành cho trang MyCourses */}
      {statusText && (
        <div className="course-card-status">
          {statusText}
        </div>
      )}

      {/* Dành cho nút Đăng ký / Sửa / Xóa */}
      {buttonText && (
        <button
          className="course-card-action"
          onClick={() => onButtonClick(course.id)}
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </button>
      )}
    </article>
  );
};

export default CourseCard;