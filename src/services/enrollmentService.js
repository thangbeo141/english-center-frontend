import apiClient from '../utils/api';

export const enrollmentService = {
  async enroll(courseId) {
    const response = await apiClient.post('/enrollments', { courseId });
    return response.data;
  }
};
