import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from '@/app/store';
import { logout } from '@/app/features/auth/authSlice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const TIMEOUT = 30000;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      store.dispatch(logout());

      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      if (typeof window !== 'undefined') {
      }
    }

    if (error.response?.status === 404) {
      console.warn('Resource not found:', originalRequest.url);
    }

    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }

    if (error.message === 'Network Error') {
      console.error('Network error - check your connection');
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  },

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
  },

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },

  upload: <T = unknown>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: { loaded: number; total?: number }) => void
  ): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },

  download: (url: string, filename?: string): Promise<void> => {
    return api
      .get(url, {
        responseType: 'blob',
      })
      .then(response => {
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      });
  },
};

export default api;

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};
