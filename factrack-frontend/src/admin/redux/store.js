import { configureStore } from '@reduxjs/toolkit';
import adminManagerReducer from './adminManagerSlice';
import adminProductReducer from './adminProductSlice'
import managerReducer from './managerSlice';

export const store = configureStore({
  reducer: {
    adminManager: adminManagerReducer,
    adminProduct: adminProductReducer,
    manager: managerReducer,
  },
});
