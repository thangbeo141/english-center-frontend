import apiClient from '../utils/api';

export const courseService = {
  async getAllCourses() {
    const response = await apiClient.get('/courses');
    return response.data;
  },

  async createCourse(courseData) {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  },

  async assignTeacher(courseId, teacherId) {
    const response = await apiClient.post(`/courses/${courseId}/assign-teacher`, { teacherId });
    return response.data;
  },

  async getMyCourses() {
    const response = await apiClient.get('/enrollments/my-courses');
    return response.data;
  },
  
  async getTeachingCourses() {
    const response = await apiClient.get('/courses/teaching');
    return response.data;
  },

  async assignTeacher(courseId, teacherId) {
    const response = await apiClient.post(`/courses/${courseId}/assign-teacher`, { teacherId });
    return response.data;
  }
};
