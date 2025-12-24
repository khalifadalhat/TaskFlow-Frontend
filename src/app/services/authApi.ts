import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  RegisterResponse,
  VerifyEmailData,
} from '@/types/auth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<RegisterResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },

  async resendVerificationOTP(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await api.post('/auth/resend-verification-otp', { email });
    return response.data;
  },

  async getOverview(timeframe: 'day' | 'week' | 'month' | 'year' = 'month') {
    const response = await api.get(`/dashboard/overview?timeframe=${timeframe}`);
    return response.data;
  },
};

export default api;
