import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import managerReducer from './managerSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    manager: managerReducer,
  },
});
