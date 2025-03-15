import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义初始状态
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 导出 action
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出 reducer
export default counterSlice.reducer;