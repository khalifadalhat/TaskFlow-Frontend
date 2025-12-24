import { authApi } from '@/app/services/authApi';
import { handleApiError } from '@/app/utils/errorHandler';
import { DashboardData, DashboardState } from '@/types/dashboard';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: DashboardState = {
  data: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

export const fetchDashboardOverview = createAsyncThunk<
  DashboardData,
  { timeframe?: 'day' | 'week' | 'month' | 'year' },
  { rejectValue: string }
>('dashboard/fetchOverview', async ({ timeframe = 'month' }, { rejectWithValue }) => {
  try {
    const response = await authApi.getOverview(timeframe);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Failed to fetch dashboard data'));
  }
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: state => {
      state.error = null;
    },
    resetDashboard: state => {
      state.data = null;
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardOverview.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch dashboard data';
      });
  },
});

export const { clearDashboardError, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
