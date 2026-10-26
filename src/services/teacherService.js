import apiClient from '../utils/api';

export const teacherService = {
  async getAllTeachers() {
    const response = await apiClient.get('/students/teachers');
    return response.data;
  }
};
