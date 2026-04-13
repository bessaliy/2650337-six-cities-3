import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../layout/header', () => ({
  default: () => <div data-testid="header" />,
}));

import PageNotFound from './page-not-found';

describe('Component: PageNotFound', () => {
  it('should render 404 page content correctly', () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/404 not found/i)).toBeInTheDocument();
    expect(screen.getByText(/упс/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /жмякай/i })).toBeInTheDocument();
  });
});
