import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import {Review} from '../../../types/review.ts';

const mockReview = {
  user: {
    name: 'John',
    avatarUrl: 'img.jpg',
  },
  comment: 'Nice place!',
  date: '2020-01-01',
  rating: 4,
} as Review;

describe('Component: ReviewItem', () => {
  it('should render review data correctly', () => {
    render(<ReviewItem data={mockReview} />);

    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/nice place/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
