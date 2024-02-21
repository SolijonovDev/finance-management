import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchIncomesData = createAsyncThunk('data/fetchIncomesData', async (_, thunk) => {
  try {
    const response = await axios.get('incomes.json');
    return response.data;
  } catch ({ message }) {
    return thunk.rejectWithValue({ message });
  }
});
