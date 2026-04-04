import {RootState} from './index';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: RootState) => state.offers.offers;
export const getCurrentOffer = (state: RootState) => state.offerDetails.currentOffer;
export const getNearbyOffers = (state: RootState) => state.offerDetails.nearbyOffers;
export const getReviewsList = (state: RootState) => state.reviews.reviews;
export const getIsOfferLoading = (state: RootState) => state.offerDetails.isOfferLoading;
const getCity = (state: RootState) => state.offers.city;

export const getReviews = createSelector(
  [getReviewsList],
  (reviews) => [...reviews].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
);

export const getFilteredOffers = createSelector(
  [getOffers, getCity],
  (offers, city) =>
    offers.filter((offer) => offer.city.name === city.name)
);

export const getFavorites = createSelector(
  [getOffers],
  (offers) => {
    const favorites = offers.filter((offer) => offer.isFavorite);

    const grouped: Record<string, typeof favorites> = {};

    favorites.forEach((offer) => {
      const city = offer.city.name;

      if (!grouped[city]) {
        grouped[city] = [];
      }

      grouped[city].push(offer);
    });

    return Object.entries(grouped).map(([city, cityOffers]) => ({
      city,
      offers: cityOffers,
    }));
  }
);

