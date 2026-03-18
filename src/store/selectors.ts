import {RootState} from './index';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: RootState) => state.offers.offers;

export const getFavorites = createSelector(
  [getOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);
