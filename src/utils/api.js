import axios from 'axios';

// 1. Khởi tạo trạm kiểm soát trung tâm (Instance)
const apiClient = axios.create({
  // Lấy đường dẫn gốc từ file .env (Render hoặc Localhost)
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 10000, // Tự động ngắt nếu server không phản hồi sau 10 giây
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Interceptor GỬI ĐI (Tự động gắn vé xe - JWT Token)
apiClient.interceptors.request.use(
  (config) => {
    // Sau khi đăng nhập, bạn sẽ lưu token vào localStorage. 
    // Trạm này sẽ tự động móc token đó ra và gắn vào mọi request gửi đi.
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor NHẬN VỀ (Tự động bóc tách dữ liệu & Bắt lỗi)
apiClient.interceptors.response.use(
  (response) => {
    // Luôn bóc lấy phần data bên trong, giúp code ở các trang ngắn gọn hơn
    return response.data;
  },
  (error) => {
    // Bắt lỗi tập trung (Ví dụ: Lỗi 401 do JWT hết hạn hoặc sai token)
    if (error.response && error.response.status === 401) {
      console.error("Lỗi xác thực: Vui lòng đăng nhập lại!");
      // Sau này có thể thêm code tự động đá người dùng văng ra trang /login ở đây
    }
    return Promise.reject(error);
  }
);

export default apiClient;