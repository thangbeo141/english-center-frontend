import apiClient from '../utils/api';

export const studentService = {
  async getAllStudents() {
    const response = await apiClient.get('/students');
    return response.data;
  },

  async createStudent(studentData) {
    const response = await apiClient.post('/students', studentData);// Create a new student
    return response.data;
  },

  deleteStudent: (studentId) => apiClient.delete(`/students/${studentId}`),

  async updateStudentName(studentId, fullName) {
    const response = await apiClient.put(`/students/${studentId}`, { fullName });
    return response.data;
  }
};
