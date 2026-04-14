import { setActiveCity, setOffers} from './action.ts';
import {Offer} from '../types/offer.ts';

describe('Actions', () => {

  it('should create setActiveCity action', () => {
    const city = {
      name: 'Paris',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 1,
      },
    };

    const action = setActiveCity(city);

    expect(action.type).toBe('city/changeCity');
    expect(action.payload).toEqual(city);
  });

  it('should create setOffers action', () => {
    const offers = [
      {
        id: '1',
      },
    ] as Offer[];

    const action = setOffers(offers);

    expect(action.type).toBe('offers/setOffers');
    expect(action.payload).toEqual(offers);
  });

});
