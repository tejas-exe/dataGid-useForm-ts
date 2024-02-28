import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from '../../../Modal/Api/UserApi';
import {
  FetchUserDataArgs,
  FormValues,
  OpenModalPayload,
  UserData,
} from '../../../Modal/Types/users-types';

export const defaultCellValue: FormValues = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  gender: '',
  date_of_birth: '',
  job: '',
  city: '',
  zipcode: '',
  street: '',
  state: '',
  country: '',
  profile_picture: '',
  phone: '',
  latitude: 0,
  longitude: 0,
};

const initialState: UserData = {
  success: false,
  message: '',
  total_users: 0,
  offset: 0,
  limit: 5,
  users: [],
  openEditForm: false,
  openDeletePopup: false,
  isEditable: false,
  cellValue: defaultCellValue,
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    openCloseModal(state: UserData, action: PayloadAction<OpenModalPayload>) {
      const { component, action: modalAction, isEditable } = action.payload;
      state.isEditable = isEditable;
      state[component] = modalAction;
    },
    selectCellValue(state: UserData, action: PayloadAction<FormValues>) {
      state.cellValue = action.payload;
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

export const { openCloseModal, selectCellValue } = UserSlice.actions;
export default UserSlice.reducer;
