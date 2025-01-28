import axios from "axios";

class ApiService {
  constructor(url) {
    this.url = url;
  }
  async getAll(model) {
    try {
      const response = await axios.get(`${this.url}/${model}`);
      return response.data;
    } catch (error) {
      alert("Ürünleri getiriken hata oldu");
    }
  }
  async makePost(model, obj) {
    try {
      const response = await axios.post(`${this.url}/${model}`, obj);
      return response.data;
    } catch (error) {
      alert("Ekleme sırasında hata oldu");
    }
  }
  async makePut(model, id, obj) {
    try {
      const response = await axios.put(`${this.url}/${model}/${id}`, obj);
      return response.data;
    } catch (error) {
      console.error("POST isteği sırasında hata oluştu:", error);
      throw error;
    }
  }
  async makeDelete(model, id) {
    try {
      await axios.delete(`${this.url}/${model}/${id}`);
    } catch (error) {
      console.error("DELETE isteği sırasında hata oluştu:", error);
    }
  }
}
export default ApiService;
