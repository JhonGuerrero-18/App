import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/MantenimientoSA/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getUsuarios: () => api.get('/auth/usuarios')
};

export default api;