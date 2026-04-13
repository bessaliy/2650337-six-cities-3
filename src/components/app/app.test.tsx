import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ReactNode } from 'react';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    BrowserRouter: ({ children }: { children: ReactNode }) => (
      <actual.MemoryRouter initialEntries={['/login']}>
        {children}
      </actual.MemoryRouter>
    ),
  } as typeof actual;
});

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
}));

vi.mock('../pages/main-page/main-page', () => ({
  default: () => <div>Main Page</div>,
}));

vi.mock('../pages/login/login-page', () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock('../pages/favorites/favorites-page', () => ({
  default: () => <div>Favorites Page</div>,
}));

vi.mock('../pages/offer/offer-page', () => ({
  default: () => <div>Offer Page</div>,
}));

vi.mock('../pages/not-found/page-not-found', () => ({
  default: () => <div>404 Page</div>,
}));

vi.mock('../private-route/private-route', () => ({
  default: ({ children }: { children: ReactNode }) => children,
}));

import App from './app';

describe('App routing', () => {
  it('should render login page when path is "/login"', () => {
    render(<App />);

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
