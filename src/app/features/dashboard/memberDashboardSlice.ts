import { authApi } from '@/app/services/authApi';
import { handleApiError } from '@/app/utils/errorHandler';
import { MemberDashboardData, MemberDashboardState } from '@/types/dashboard';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: MemberDashboardState = {
  data: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

export const fetchMemberDashboard = createAsyncThunk<
  MemberDashboardData,
  { timeframe?: 'day' | 'week' | 'month' | 'year' },
  { rejectValue: string }
>('memberDashboard/fetch', async ({ timeframe = 'month' }, { rejectWithValue }) => {
  try {
    const response = await authApi.getMemberOverview(timeframe);
    return response.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error, 'Failed to fetch member dashboard data'));
  }
});

const memberDashboardSlice = createSlice({
  name: 'memberDashboard',
  initialState,
  reducers: {
    clearMemberDashboardError: state => {
      state.error = null;
    },
    resetMemberDashboard: state => {
      state.data = null;
      state.error = null;
      state.lastFetched = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMemberDashboard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMemberDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(fetchMemberDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch member dashboard data';
      });
  },
});

export const { clearMemberDashboardError, resetMemberDashboard } = memberDashboardSlice.actions;
export default memberDashboardSlice.reducer;
