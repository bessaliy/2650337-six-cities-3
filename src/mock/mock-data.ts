import {DetailedOffer, Offer} from '../types/offer.ts';
import {CITIES} from '../const.ts';

const cityParis = CITIES.find((city) => city.name === 'Paris')!;
const cityCologne = CITIES.find((city) => city.name === 'Cologne')!;
const cityBrussels = CITIES.find((city) => city.name === 'Brussels')!;
const cityAmsterdam = CITIES.find((city) => city.name === 'Amsterdam')!;
const cityHamburg = CITIES.find((city) => city.name === 'Hamburg')!;
const cityDusseldorf = CITIES.find((city) => city.name === 'Dusseldorf')!;

export const MockData: Offer[] = [
  {
    'id': '3e91b7f2-5c4a-4d89-9a2f-7b6c1e0d2f43',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': cityParis,
    'location': {
      'latitude': 48.8649553943508,
      'longitude': 2.34909666406198,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg'
  },
  {
    'id': 'a7c2d1e9-8f34-4b6a-b912-5e7f3c2a9d10',
    'title': 'Elegant studio wrapped in shadows and quiet luxury',
    'type': 'room',
    'price': 110,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/11.jpg'
  },
  {
    'id': '5b8f3a21-9c7d-4e62-8a1f-2d6b7c4e9f30',
    'title': 'Stone and wood retreat with secrets in the walls',
    'type': 'house',
    'price': 80,
    'city': cityBrussels,
    'location': {
      'latitude': 50.8509553943508,
      'longitude': 4.351309666406198,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/12.jpg'
  },
  {
    'id': 'd4a9c2b7-1e6f-4a83-b5d1-9f2c7e3a6b48',
    'title': 'Warm, intimate apartment where silence feels expensive',
    'type': 'apartment',
    'price': 1200,
    'city': cityCologne,
    'location': {
      'latitude': 50.9409553943508,
      'longitude': 6.960309666406198,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/13.jpg'
  },
  {
    'id': '8f1c7d2a-3b9e-4f65-92a7-6c1d8e4b3f90',
    'title': 'Hidden gem studio in the heart of the city',
    'type': 'hotel',
    'price': 145,
    'city': cityHamburg,
    'location': {
      'latitude': 53.5512345678901,
      'longitude': 9.99123456789012,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/14.jpg'
  },
  {
    'id': 'c2b7e4a9-6d1f-4c83-8a5e-3f9b2d7a1c64',
    'title': 'Cozy hideaway with a bed made for long nights',
    'type': 'room',
    'price': 98,
    'city': cityDusseldorf,
    'location': {
      'latitude': 51.2245678901234,
      'longitude': 6.78234567890123,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/15.jpg'
  },
  {
    'id': '1d9a7c3e-4b2f-4e86-b1c5-7a3d9f2e6c80',
    'title': 'Refined space where light falls softly on stone floors',
    'type': 'studio',
    'price': 220,
    'city': cityDusseldorf,
    'location': {
      'latitude': 51.2389012345678,
      'longitude': 6.77345678901234,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/16.jpg'
  },
  {
    'id': '7c3e1a9d-5f2b-4a68-8d1c-9e6b3f7a2c41',
    'title': 'Urban sanctuary with a touch of mystery',
    'type': 'studio',
    'price': 320,
    'city': cityCologne,
    'location': {
      'latitude': 50.9323456789012,
      'longitude': 6.94456789012345,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 2,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/17.jpg'
  },
  {
    'id': '9a2f6c1d-3e7b-4d85-b4c2-1f8a7e3d6b90',
    'title': 'Soft-lit apartment with timeless wooden charm',
    'type': 'room',
    'price': 1456,
    'city': cityParis,
    'location': {
      'latitude': 48.8576543210987,
      'longitude': 2.35567890123456,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/18.jpg'
  },
  {
    'id': '4b7d2e9a-1c6f-4a83-9e2d-5f3a8c1b7d60',
    'title': 'Discreet luxury studio in a prime location',
    'type': 'house',
    'price': 346,
    'city' : cityBrussels,
    'location': {
      'latitude': 50.8598765432109,
      'longitude': 4.36178901234567,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 1,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/19.jpg'
  },
  {
    'id': 'e3a9c7b2-5d1f-4e68-8b2c-6f1d9a4e3c75',
    'title': 'Intimate retreat with warm textures and deep comfort',
    'type': 'apartment',
    'price': 135,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.4012345678901,
      'longitude': 4.92789012345678,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/20.jpg'
  },
  {
    'id': '2f6b9d1a-7c3e-4a85-b8d2-3e1f7c9a6b40',
    'title': 'Stylish hideout where comfort meets quiet elegance',
    'type': 'studio',
    'price': 112,
    'city': cityCologne,
    'location': {
      'latitude': 50.9456789012345,
      'longitude': 6.95890123456789,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/9.jpg'
  },
  {
    'id': '6c1d8a3f-4b7e-4d92-9a5c-2f7b3e1d8c60',
    'title': 'Stone-walled haven with a story to tell',
    'type': 'hotel',
    'price': 110,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.3832109876543,
      'longitude': 4.94901234567890,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/9.jpg'
  },
  {
    'id': 'b7e2c9a4-1d6f-4a83-8f5c-9e3a2d7b6c10',
    'title': 'Private escape with a generously sized, inviting bed',
    'type': 'hotel',
    'price': 514,
    'city': cityParis,
    'location': {
      'latitude': 48.8590987654321,
      'longitude': 2.34890123456789,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
  },
  {
    'id': '0f9a3c7d-5b2e-4e86-b1d4-7c3a9f2e6b85',
    'title': 'Sophisticated studio with moody ambiance',
    'type': 'apartment',
    'price': 178,
    'city': cityBrussels,
    'location': {
      'latitude': 50.8443210987654,
      'longitude': 4.32789012345678,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/7.jpg'
  },
  {
    'id': '5d2a7e9c-3f1b-4a68-8c9e-1f6d3b7a2c40',
    'title': 'Warm and secluded apartment in a sought-after area',
    'type': 'room',
    'price': 56,
    'city': cityHamburg,
    'location': {
      'latitude': 53.5621098765432,
      'longitude': 9.97690123456789,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/6.jpg'
  },
  {
    'id': 'a1c7e3d9-4b6f-4d82-b5a9-2e7c1f3d8b60',
    'title': 'Minimalist space with shadows and subtle luxury',
    'type': 'studio',
    'price': 165,
    'city': cityDusseldorf,
    'location': {
      'latitude': 51.2321098765432,
      'longitude': 6.77690123456789,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/5.jpg'
  },
  {
    'id': '7e3b1a9c-2d6f-4a85-9c4e-6f1a8d3b7c20',
    'title': 'Elegant hideaway crafted from wood and stone',
    'type': 'hotel',
    'price': 212,
    'city': cityCologne,
    'location': {
      'latitude': 50.9309876543210,
      'longitude': 6.96501234567890,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/4.jpg'
  },
  {
    'id': 'c9a2d7e4-5b1f-4e68-8a3d-7f2c1b9a6d40',
    'title': 'Cozy refuge with an air of intrigue',
    'type': 'room',
    'price': 267,
    'city': cityHamburg,
    'location': {
      'latitude': 53.5487654321098,
      'longitude': 9.99312345678901,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/3.jpg'
  },
  {
    'id': '3d7a1c9e-6b2f-4a83-b9e5-1c8f3a7d6e20',
    'title': 'Quiet central studio where nights feel cinematic',
    'type': 'apartment',
    'price': 2140,
    'city': cityHamburg,
    'location': {
      'latitude': 53.5565432109876,
      'longitude': 9.99123456789012,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': true,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/2.jpg'
  },
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Luxurious nest with warmth, depth, and character',
    'type': 'studio',
    'price': 109,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.3943210987654,
      'longitude': 4.90934567890123,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 5,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/1.jpg'
  }
];

export const MockDataInitial : Offer[] = [
  {
    'id': '3e91b7f2-5c4a-4d89-9a2f-7b6c1e0d2f43',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': cityParis,
    'location': {
      'latitude': 48.8649553943508,
      'longitude': 2.34909666406198,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg'
  },
  {
    'id': 'a7c2d1e9-8f34-4b6a-b912-5e7f3c2a9d10',
    'title': 'Elegant studio wrapped in shadows and quiet luxury',
    'type': 'room',
    'price': 110,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/11.jpg'
  },
];

export const ChangedOffer: Offer = {
  'id': '3e91b7f2-5c4a-4d89-9a2f-7b6c1e0d2f43',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': cityParis,
  'location': {
    'latitude': 48.8649553943508,
    'longitude': 2.34909666406198,
    'zoom': 8
  },
  'isFavorite': true,
  'isPremium': false,
  'rating': 4,
  'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg'
};
export const ChangedOfferFalse: Offer = {
  'id': '3e91b7f2-5c4a-4d89-9a2f-7b6c1e0d2f43',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': cityParis,
  'location': {
    'latitude': 48.8649553943508,
    'longitude': 2.34909666406198,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg'
};

export const MockDataExpected: Offer[] = [
  {
    'id': '3e91b7f2-5c4a-4d89-9a2f-7b6c1e0d2f43',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': cityParis,
    'location': {
      'latitude': 48.8649553943508,
      'longitude': 2.34909666406198,
      'zoom': 8
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg'
  },
  {
    'id': 'a7c2d1e9-8f34-4b6a-b912-5e7f3c2a9d10',
    'title': 'Elegant studio wrapped in shadows and quiet luxury',
    'type': 'room',
    'price': 110,
    'city': cityAmsterdam,
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 3,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/11.jpg'
  },
];

export const MockDetailedOffer: DetailedOffer = {
  'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'https://url-to-image/image.png',
    'isPro': false
  },
  'images': [
    'https://url-to-image/image.png'
  ],
  'maxAdults': 4
};

