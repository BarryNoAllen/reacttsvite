import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// 配置 store
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 导出 store
export default store;