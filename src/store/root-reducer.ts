import {combineReducers} from '@reduxjs/toolkit';

import offersReducer from './offers/offers-slice';
import offerDetailsReducer from './offer-details/offer-details-slice';
import reviewsReducer from './reviews/reviews-slice';
import userReducer from './user/user-slice';
import favoritesReducer from './favorites/favorites-slice';

export const rootReducer = combineReducers({
  offers: offersReducer,
  offerDetails: offerDetailsReducer,
  reviews: reviewsReducer,
  user: userReducer,
  favorites: favoritesReducer,
});
