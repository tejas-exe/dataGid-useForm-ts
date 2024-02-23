import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from '../../../Modal/Api/UserApi';
import { OpenModalPayload, UserData } from '../../../Types/users-types';

const initialState: UserData = {
  success: false,
  message: '',
  total_users: 0,
  offset: 0,
  limit: 0,
  users: [],
  openEditForm: false,
  openDeletePopup: false,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    openCloseModal(state: UserData, action: PayloadAction<OpenModalPayload>) {
      const { component, action: modalAction } = action.payload;
      state[component] = modalAction;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUserData.fulfilled,
        (state: UserData, action: PayloadAction<UserData>) => {
          const { total_users, offset, limit, users } = action.payload;
          return {
            ...state,
            success: true,
            message: 'success',
            total_users,
            offset,
            limit,
            users,
          };
        },
      )
      .addCase(fetchUserData.pending, (state: UserData) => {
        return {
          ...state,
          message: 'loading',
          users: [],
        };
      })
      .addCase(fetchUserData.rejected, (state: UserData) => {
        return {
          ...state,
          success: false,
          message: 'error',
          users: [],
        };
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
      throw error;
    }
  },
);

export const { openCloseModal } = UserSlice.actions;
export default UserSlice.reducer;
