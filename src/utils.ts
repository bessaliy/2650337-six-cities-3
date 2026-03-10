import { Offer } from './types/offer.ts';
import {Review} from './types/review.ts';
import { SortingType } from './const';


export function getRandomCards<T>(data: T[], count: number): T[] {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}
export function getRatingWidth(props: Offer): string {
  return `${Math.round(props.rating) * 20}%`;
}

export function getReviewRatingWidth(props: Review): string {
  return `${Math.round(props.rating) * 20}%`;
}

export function getReviewDate(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function getSortedOffers(offers: Offer[], sortingType: SortingType): Offer[] {
  const sortedOffers = [...offers];

  switch (sortingType) {
    case SortingType.PriceLowToHigh:
      return sortedOffers.sort((a, b) => a.price - b.price);

    case SortingType.PriceHighToLow:
      return sortedOffers.sort((a, b) => b.price - a.price);

    case SortingType.TopRatedFirst:
      return sortedOffers.sort((a, b) => b.rating - a.rating);

    case SortingType.Popular:
    default:
      return sortedOffers;
  }
}

// export const getOfferRoute = (id: string) => `/offer/${id}`;
