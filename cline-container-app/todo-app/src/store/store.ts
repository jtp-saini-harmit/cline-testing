import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts';
import todoReducer from './todoSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
