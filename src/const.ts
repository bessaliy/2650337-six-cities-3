import {City} from './types/city.ts';

export const Setting = {
  cardsAmount: 5
};

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
];

export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum MapName {
  Cities = 'cities',
  Offers = 'offer',
}

export enum ViewModeNames {
  Cities = 'CitiesView',
  Favorites = 'FavoritesView',
  Offers = 'OffersView',
}

export const ViewMode = {
  CitiesView: {
    name: 'cities',
    width: 260,
    height: 200,
  },
  FavoritesView: {
    name: 'favorites',
    width: 150,
    height: 110,
  },
  OffersView: {
    name: 'near-places',
    width: 260,
    height: 200,
  },
};
