import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthStatus } from '../../const';

describe('Component: PrivateRoute', () => {

  const renderWithAuth = async (authStatus: AuthStatus) => {
    vi.resetModules();

    vi.doMock('react-redux', () => ({
      useSelector: () => authStatus,
    }));

    vi.doMock('../ui/spinner/spinner', () => ({
      default: () => <div>Loading...</div>,
    }));

    const { default: PrivateRoute } = await import('./private-route');

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected</div>
        </PrivateRoute>
      </MemoryRouter>
    );
  };

  it('should render spinner when auth status is Unknown', async () => {
    await renderWithAuth(AuthStatus.Unknown);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should redirect when auth status is NoAuth', async () => {
    await renderWithAuth(AuthStatus.NoAuth);

    expect(screen.queryByText(/protected/i)).not.toBeInTheDocument();
  });

  it('should render children when auth status is Auth', async () => {
    await renderWithAuth(AuthStatus.Auth);

    expect(screen.getByText(/protected/i)).toBeInTheDocument();
  });

});
