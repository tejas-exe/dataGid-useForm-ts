import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      .addCase(
        fetchUserData.fulfilled,(state, action: PayloadAction<UserData>) => {
          Object.assign(state, action.payload, {
            success: true,
            message: 'success',
          });
        },
      )
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

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const response = await UserApi.fetchUser();
      return response;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return initialState;
    }
  },
);


export default UserSlice.reducer;
