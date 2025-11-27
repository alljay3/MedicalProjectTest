import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/disease';

class DiseaseService {
  async getAllDiseases() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }

  async getDiseaseById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  async createDisease(diseaseData) {
    const response = await axios.post(API_BASE_URL, diseaseData);
    return response.data;
  }

  async updateDisease(id, diseaseData) {
    const response = await axios.put(`${API_BASE_URL}/${id}`, diseaseData);
    return response.data;
  }

  async deleteDisease(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
}

export default new DiseaseService();