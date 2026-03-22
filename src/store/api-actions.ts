import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AxiosInstance} from 'axios';
import {setAuthorizationStatus, setLoginError, setUserEmail} from './reducer.ts';
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
      const {data} = await api.get<AuthData>('/login');
      dispatch(setAuthorizationStatus(AuthStatus.Auth));
      dispatch(setUserEmail(data.email));
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
      dispatch(setLoginError(null));

    } catch (error) {
      dispatch(setLoginError('Неверный email или пароль'));
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
