import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducers/UserSlice/UserSlice';

export const store = configureStore({
  reducer: {
    userReducer: UserSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
