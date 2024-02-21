import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../../Api/UserApi';
import { UserData } from '../../Types/users-types';

const initialState: UserData = {
  success: false,
  message: '',
  total_users: 0,
  offset: 0,
  limit: 0,
  users: [],
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    // Define reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, actions) => {
        state.success = true;
        state.message = 'success';
        state.total_users = actions.payload.total_users;
        state.offset = actions.payload.offset;
        state.limit = actions.payload.limit;
        state.users = actions.payload.users;
      })
      .addCase(fetchUserData.pending, (state, actions) => {
        state.message = 'loading';
        state.users = [];
      })
      .addCase(fetchUserData.rejected, (state, actions) => {
        state.success = false;
        state.message = 'error';
      });
  },
});

interface FetchUserDataArgs {
  page: number;
  pageSize: number;
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async ({ page, pageSize }: FetchUserDataArgs) => {
    try {
      const response = await UserApi.fetchUser(page, pageSize);
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return initialState;
    }
  },
);

export default UserSlice.reducer;
