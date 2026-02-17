import { Offer } from './types/offer.ts';

export function getRandomCards<T>(data: T[], count: number): T[] {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}
export function getRatingWidth(props: Offer): string {
  return `${Math.round(props.rating) * 20}%`;
}
