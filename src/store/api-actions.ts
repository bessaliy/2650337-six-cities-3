import {createAsyncThunk} from '@reduxjs/toolkit';
import {DetailedOffer, Offer} from '../types/offer';
import {AxiosInstance} from 'axios';
import {setAuthorizationStatus} from './user/user-slice.ts';
import {setLoginError} from './user/user-slice.ts';
import {setUserEmail} from './user/user-slice.ts';
import {AuthStatus} from '../const.ts';
import {AuthData} from '../types/auth.ts';
import {Review} from '../types/review.ts';

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

export const fetchFavorites = createAsyncThunk<
  Offer[],
  void,
  {extra: AxiosInstance}
>('favorites/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/favorite');
    return data;
  });

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  {extra: AxiosInstance}
>(
  '/reviews/fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`/comments/${id}`);
    return data;
  }
);

export const fetchDetailedOffer = createAsyncThunk<
  DetailedOffer,
  string,
  {extra: AxiosInstance}
>(
  'offers/fetchDetailedOffer',
  async (id, {extra: api}) => {
    const {data} = await api.get<DetailedOffer>(`/offers/${id}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {extra: AxiosInstance}
>(
  '/offers/fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`/offers/${id}/nearby`);
    return data;
  }
);

export const postReview = createAsyncThunk<
  Review,
  {id: string; comment: string; rating: number},
  {extra: AxiosInstance}
>(
  '/reviews/postReview',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Review>(`/comments/${id}`, {comment, rating});
    return data;
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
export const toggleFavorites = createAsyncThunk<
  Offer,
  { id: string; isFavorite: boolean },
  {extra: AxiosInstance}
>(
  'favorites/toggleFavorites',
  async ({id, isFavorite}, {extra: api}) => {
    const status = (isFavorite ? 0 : 1);
    const {data} = await api.post<Offer>(`/favorite/${id}/${status}`);
    return data;
  }
);
