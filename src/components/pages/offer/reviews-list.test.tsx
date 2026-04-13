import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('./review-item', () => ({
  default: () => <div data-testid="review-item" />,
}));

vi.mock('./review-form', () => ({
  default: () => <div data-testid="review-form" />,
}));

import ReviewsList from './reviews-list';
import { AuthStatus, ReviewAmount } from '../../../const';
import {Review} from '../../../types/review.ts';

const reviews = Array.from({ length: 10 }, (_, i) => ({
  id: String(i),
})) as Review[];

describe('Component: ReviewsList', () => {
  it('should render correct number of reviews (limited by ReviewAmount)', () => {
    render(
      <ReviewsList
        reviews={reviews}
        isAuth={AuthStatus.NoAuth}
        offerId="1"
      />
    );

    expect(screen.getAllByTestId('review-item')).toHaveLength(ReviewAmount);
  });

  it('should render review form when user is authorized', () => {
    render(
      <ReviewsList
        reviews={reviews}
        isAuth={AuthStatus.Auth}
        offerId="1"
      />
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });

  it('should not render review form when user is not authorized', () => {
    render(
      <ReviewsList
        reviews={reviews}
        isAuth={AuthStatus.NoAuth}
        offerId="1"
      />
    );

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();
  });
});
