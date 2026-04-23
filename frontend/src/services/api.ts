import axios from 'axios';

// Usar VITE_API_BASE_URL configurada no .env ou fallback para localhost:8080 (dev)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
