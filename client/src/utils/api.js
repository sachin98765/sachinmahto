import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Auto-attach JWT
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('portfolio_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) localStorage.removeItem('portfolio_token');
    return Promise.reject(err);
  }
);

export const fetchProjects  = ()     => api.get('/projects');
export const fetchSkills    = ()     => api.get('/skills');
export const fetchLeetcode  = ()     => api.get('/leetcode');
export const submitContact  = data   => api.post('/contact', data);
export const loginAdmin     = creds  => api.post('/auth/login', creds);
export const checkHealth    = ()     => api.get('/health');

export default api;
