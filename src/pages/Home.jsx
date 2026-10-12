import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <p style={{ marginBottom: '12px', color: '#2c3e50', fontWeight: 700 }}>ENGLISH CENTER</p>
      <h1 style={{ marginBottom: '16px' }}>Chào mừng bạn đến với English Center</h1>
      <p style={{ margin: '0 auto 32px', maxWidth: '520px' }}>
        Học tập, quản lý khóa học và theo dõi hành trình tiếng Anh của bạn trong một nơi.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <Link
          to="/login"
          style={{ padding: '11px 20px', borderRadius: '6px', backgroundColor: '#2c3e50', color: '#fff', textDecoration: 'none' }}
        >
          Đăng nhập
        </Link>
        <Link
          to="/register"
          style={{ padding: '11px 20px', borderRadius: '6px', border: '1px solid #2c3e50', color: '#2c3e50', textDecoration: 'none' }}
        >
          Đăng ký
        </Link>
      </div>
    </main>
  );
}
