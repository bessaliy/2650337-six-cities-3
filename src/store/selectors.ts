import {RootState} from './index';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: RootState) => state.offers.offers;
const getFavorites = (state: RootState) => state.favorites.favorites;
export const getCurrentOffer = (state: RootState) => state.offerDetails.currentOffer;
export const getNearbyOffers = (state: RootState) => state.offerDetails.nearbyOffers;
export const getReviewsList = (state: RootState) => state.reviews.reviews;
export const getIsOfferLoading = (state: RootState) => state.offerDetails.isOfferLoading;
export const getAuth = (state: RootState) => state.user.authorizationStatus;
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

export const getFavoritesOffers = createSelector(
  [getFavorites],
  (favorites) => {
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

