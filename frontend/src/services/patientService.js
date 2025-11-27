import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/patient';

class PatientService {
  async getAllPatients() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }

  async getPatientById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  async createPatient(patientData) {
    const response = await axios.post(API_BASE_URL, patientData);
    return response.data;
  }

  async updatePatient(id, patientData) {
    const response = await axios.put(`${API_BASE_URL}/${id}`, patientData);
    return response.data;
  }

  async deletePatient(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
}

export default new PatientService();