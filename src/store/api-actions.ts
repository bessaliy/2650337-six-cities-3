import {createAsyncThunk} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AxiosInstance} from 'axios';

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
