export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  needsVerification: boolean;
  verificationEmail: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface VerifyEmailData {
  email: string;
  otp: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isVerified: boolean;
  profilePicture?: string;
  skills?: string[];
  availability?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    needsVerification: boolean;
    expiresIn: string;
  };
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      code?: string;
    };
  };
}

export interface LoginErrorPayload {
  message: string;
  needsVerification: true;
  email: string;
}

export type LoginRejectedPayload = string | LoginErrorPayload;
