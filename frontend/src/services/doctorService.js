import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/doctor';

class DoctorService {
  async getAllDoctors() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }

  async getDoctorsBySpecialization(spec) {
    const response = await axios.get(`${API_BASE_URL}/spec/${spec}`);
    return response.data;
  }

  async getDoctorById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  async createDoctor(doctorData) {
    const response = await axios.post(API_BASE_URL, doctorData);
    return response.data;
  }

  async updateDoctor(id, doctorData) {
    const response = await axios.put(`${API_BASE_URL}/${id}`, doctorData);
    return response.data;
  }

  async deleteDoctor(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
}

export default new DoctorService();