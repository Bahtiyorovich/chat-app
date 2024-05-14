import axios from 'axios';
import baseURL from './apiConfig';

const apiClient = axios.create({
  baseURL,
});

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data; // Agar xatolik bo'lmasa, ma'lumotlarni qaytaradi
  } catch (error) {
    // Agar xatolik bo'lsa, hatolarni to'g'ri ko'rsatish
    throw error.response ? error.response.data : error.message;
  }
};


export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post('/users/login', userData);
    return response.data; // Agar xatolik bo'lmasa, ma'lumotlarni qaytaradi
  } catch (error) {
    // Agar xatolik bo'lsa, hatolarni to'g'ri ko'rsatish
    throw error.response ? error.response.data : error.message;
  }
};

export default apiClient;
