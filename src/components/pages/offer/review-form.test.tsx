import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewForm from './review-form';

type MockState = {
  reviews: {
    isReviewSubmitting: boolean;
    reviewError: string | null;
    isReviewSubmitSuccess: boolean;
  };
};

let currentState: MockState;

const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: typeof currentState) => unknown) =>
    selector(currentState),
}));

describe('Component: ReviewForm', () => {

  beforeEach(() => {
    mockDispatch.mockReset();

    currentState = {
      reviews: {
        isReviewSubmitting: false,
        reviewError: null,
        isReviewSubmitSuccess: false,
      },
    };
  });

  it('should render submit button disabled initially', () => {
    render(<ReviewForm offerId="1" />);

    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toBeDisabled();
  });

  it('should enable submit when valid data entered', () => {
    render(<ReviewForm offerId="1" />);

    fireEvent.change(screen.getByPlaceholderText(/tell how was your stay/i), {
      target: { value: 'good '.repeat(20) },
    });

    fireEvent.click(document.getElementById('5-stars') as HTMLElement);

    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).not.toBeDisabled();
  });

  it('should dispatch postReview on submit', () => {
    render(<ReviewForm offerId="1" />);

    fireEvent.change(screen.getByPlaceholderText(/tell how was your stay/i), {
      target: { value: 'good '.repeat(20) },
    });

    fireEvent.click(document.getElementById('5-stars') as HTMLElement);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
