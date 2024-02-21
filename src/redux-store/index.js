import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './reducers/incomeReducer';
import expenseReducer from './reducers/expenseReducer';

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
