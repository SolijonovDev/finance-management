import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { fetchExpensesData } from './../actions/expensesAction';

const initialState = {
  status: 'idle',
  error: '',
  expenses: [],
  categories: ['Еда', 'Одежда', 'Машина', 'Обучение', 'Подписка', 'Такси'],
};

const { reducer, actions } = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addNewExpense(state, action) {
      const newExpense = {
        id: nanoid(),
        created_at: Date.now(),
        tag: 'expense',
        ...action.payload,
      };

      state.expenses.unshift(newExpense);
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    changeExpense(state, action) {
      const { id, price, date } = action.payload;

      state.expenses = state.expenses.map((expense) =>
        expense.id === id ? { ...expense, price, date } : expense,
      );
    },
    addNewCategory(state, action) {
      state.categories.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpensesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload.data;
      })
      .addCase(fetchExpensesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addNewExpense, deleteExpense, changeExpense, addNewCategory } = actions;
export default reducer;
