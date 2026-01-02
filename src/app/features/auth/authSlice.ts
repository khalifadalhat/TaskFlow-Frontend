import { authApi } from '@/app/services/authApi';
import { handleApiError, isAxiosError } from '@/app/utils/errorHandler';
import {
  AuthState,
  LoginCredentials,
  LoginRejectedPayload,
  RegisterData,
  User,
  VerifyEmailData,
} from '@/types/auth';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  success: false,
  needsVerification: false,
  verificationEmail: null,
};

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      initialState.user = JSON.parse(userStr);
      initialState.token = token;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}

export const login = createAsyncThunk<
  { user: User; token: string },
  LoginCredentials,
  { rejectValue: LoginRejectedPayload }
>('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await authApi.login(credentials);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
      return rejectWithValue({
        message: handleApiError(error),
        needsVerification: true,
        email: credentials.email,
      });
    }
    return rejectWithValue(handleApiError(error, 'Login failed'));
  }
});

export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Registration failed'));
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (data: VerifyEmailData, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Verification failed'));
    }
  }
);

export const resendVerificationOTP = createAsyncThunk(
  'auth/resendVerificationOTP',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.resendVerificationOTP(email);
      return response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, 'Failed to resend OTP'));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSuccess: state => {
      state.success = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
        state.needsVerification = false;

        const userData = action.payload.user;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);

        document.cookie = `token=${action.payload.token}; path=/; max-age=86400; SameSite=strict`;
        document.cookie = `role=${userData.role}; path=/; max-age=86400; SameSite=strict`;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        const payload = action.payload;

        if (payload && typeof payload === 'object' && 'needsVerification' in payload) {
          state.needsVerification = true;
          state.verificationEmail = payload.email;
          state.error = payload.message || 'Please verify your email before logging in';
        } else {
          state.error = (payload as string) || 'Login failed';
        }
      });

    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.needsVerification = action.payload.needsVerification;
        state.verificationEmail = action.payload.email;
        state.success = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(verifyEmail.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.needsVerification = false;
        state.success = true;
        state.error = null;

        const userData = action.payload.user;

        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);

        document.cookie = `token=${action.payload.token}; path=/; max-age=86400; SameSite=strict`;
        document.cookie = `role=${userData.role}; path=/; max-age=86400; SameSite=strict`;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(logout.fulfilled, state => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      state.user = null;
      state.token = null;
      state.needsVerification = false;
      state.verificationEmail = null;
      state.error = null;
      state.success = false;
    });
  },
});

export const { clearError, clearSuccess, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
