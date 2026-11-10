import { useState } from 'react';

export default function ConsultationModal({ isOpen, onClose }) {
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    onClose();
  };

  return (
    <div className="consultation-modal-backdrop" role="presentation" onMouseDown={handleClose}>
      <div
        className="consultation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="consultation-modal-close" type="button" aria-label="Đóng form tư vấn" onClick={handleClose}>
          ×
        </button>

        {isSent ? (
          <div className="consultation-success">
            <span>✓</span>
            <h2>Đã nhận yêu cầu của bạn!</h2>
            <p>NextStep sẽ liên hệ lại trong thời gian sớm nhất.</p>
            <button className="consultation-submit" type="button" onClick={handleClose}>Đóng</button>
          </div>
        ) : (
          <>
            <span className="consultation-modal-kicker">TƯ VẤN LỘ TRÌNH</span>
            <h2 id="consultation-title">Để lại thông tin, chúng mình sẽ hỗ trợ bạn</h2>
            <p className="consultation-modal-description">Đây là form tư vấn miễn phí, giúp bạn chọn đúng khóa học và lộ trình phù hợp.</p>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Họ và tên" aria-label="Họ và tên" required />
              <input type="email" name="email" placeholder="Email" aria-label="Email" required />
              <select name="goal" defaultValue="" aria-label="Mục tiêu của bạn" required>
                <option value="" disabled>Mục tiêu của bạn</option>
                <option value="communication">Giao tiếp tự tin</option>
                <option value="ielts">Luyện thi IELTS</option>
                <option value="toeic">Luyện thi TOEIC</option>
                <option value="four-skills">Phát triển 4 kỹ năng</option>
              </select>
              <button className="consultation-submit" type="submit">Gửi yêu cầu tư vấn</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
