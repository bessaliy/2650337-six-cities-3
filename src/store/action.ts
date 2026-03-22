import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const setActiveCity = createAction<City>('city/changeCity');

export const setOffers = createAction<Offer[]>('offers/setOffers');


