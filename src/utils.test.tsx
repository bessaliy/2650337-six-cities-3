import {
  getRatingWidth,
  getReviewRatingWidth,
  getReviewDate,
  getCapitalized,
  getSortedOffers,
} from './utils';

import { SortingType } from './const';

describe('Utils functions', () => {

  it('should calculate rating width correctly', () => {
    expect(getRatingWidth({ rating: 4 } as any)).toBe('80%');
  });

  it('should calculate review rating width correctly', () => {
    expect(getReviewRatingWidth({ rating: 3 } as any)).toBe('60%');
  });

  it('should format review date correctly', () => {
    const result = getReviewDate('2020-01-01');
    expect(result).toMatch(/2020/);
  });

  it('should capitalize first letter', () => {
    expect(getCapitalized('apartment')).toBe('Apartment');
  });

  it('should sort offers by price low to high', () => {
    const offers = [
      { price: 200, rating: 4 },
      { price: 100, rating: 5 },
    ] as any;

    const result = getSortedOffers(offers, SortingType.PriceLowToHigh);

    expect(result[0].price).toBe(100);
  });

  it('should sort offers by price high to low', () => {
    const offers = [
      { price: 100, rating: 4 },
      { price: 200, rating: 5 },
    ] as any;

    const result = getSortedOffers(offers, SortingType.PriceHighToLow);

    expect(result[0].price).toBe(200);
  });

  it('should sort offers by rating', () => {
    const offers = [
      { price: 100, rating: 3 },
      { price: 200, rating: 5 },
    ] as any;

    const result = getSortedOffers(offers, SortingType.TopRatedFirst);

    expect(result[0].rating).toBe(5);
  });

  it('should return offers without sorting for Popular', () => {
    const offers = [
      { price: 100, rating: 3 },
      { price: 200, rating: 5 },
    ] as any;

    const result = getSortedOffers(offers, SortingType.Popular);

    expect(result).toEqual(offers);
  });

});
