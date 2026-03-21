import {RootState} from './index';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: RootState) => state.offers.offers;
const getCity = (state: RootState) => state.offers.city;

export const getFilteredOffers = createSelector(
  [getOffers, getCity],
  (offers, city) =>
    offers.filter((offer) => offer.city.name === city.name)
);

export const getFavorites = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);
