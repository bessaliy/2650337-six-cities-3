import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './reducer';
import {createAPI} from '../services/api.ts';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
