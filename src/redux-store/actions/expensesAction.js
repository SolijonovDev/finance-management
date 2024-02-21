import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExpensesData = createAsyncThunk('data/fetchExpensesData', async (_, thunk) => {
  try {
    const response = await axios.get('expenses.json');
    return response.data;
  } catch ({ message }) {
    return thunk.rejectWithValue({ message });
  }
});
