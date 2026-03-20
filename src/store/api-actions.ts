import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AxiosInstance} from 'axios';
import {setAuthorizationStatus, setUserEmail} from './reducer.ts';
import {AuthStatus} from '../const.ts';
import {AuthData} from '../types/auth.ts';

export const fetchOffers = createAsyncThunk<
  Offer[],
  void,
  { extra: AxiosInstance }
>(
  'offers/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const checkAuth = createAsyncThunk<
  void,
  void,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<
  void,
  {email: string; password: string},
  {extra: AxiosInstance}
>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<AuthData>('/login', {email, password});

      localStorage.setItem('token', data.token);
      dispatch(setAuthorizationStatus(AuthStatus.Auth));
      dispatch(setUserEmail(data.email));

    } catch (error) {
      void 0;
      // а вообще чего мы тут делать то должны? показывать ошибку что емейл/пароль неверный или нет?
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  {extra: AxiosInstance}
>(
  'user/logout',
  (_arg, {dispatch}) => {
    localStorage.removeItem('token');

    dispatch(setAuthorizationStatus(AuthStatus.NoAuth));
    dispatch(setUserEmail(null));
  }
);
