import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './reducers/appConfigReducer';

export const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
  },
});
