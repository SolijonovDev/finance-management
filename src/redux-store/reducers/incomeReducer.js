import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchIncomesData } from './../actions/incomesAction';

const initialState = {
  status: 'idle',
  error: '',
  incomes: [],
};

const { reducer, actions } = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addNewIncome(state, action) {
      const newIncome = {
        id: nanoid(),
        created_at: Date.now(),
        tag: 'income',
        ...action.payload,
      };
      state.incomes.unshift(newIncome);
    },
    deleteIncome(state, action) {
      state.incomes = state.incomes.filter((income) => income.id !== action.payload);
    },
    changeIncome(state, action) {
      const { id, text, price, date } = action.payload;

      state.incomes = state.incomes.map((income) =>
        income.id === id ? { ...income, text, price, date } : income,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncomesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incomes = action.payload.data;
      })
      .addCase(fetchIncomesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addNewIncome, deleteIncome, changeIncome } = actions;
export default reducer;
