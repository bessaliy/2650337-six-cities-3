import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthStatus } from '../../const';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      user: {
        userEmail: 'test@mail.com',
      },
      favorites: {
        favorites: [1, 2, 3],
      },
    }),
}));

import UserNav from './user-nav';

describe('Component: UserNav', () => {
  it('should render authorized user navigation', () => {
    render(
      <MemoryRouter>
        <UserNav isAuth={AuthStatus.Auth} />
      </MemoryRouter>
    );

    expect(screen.getByText(/test@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('should render sign in link when not authorized', () => {
    render(
      <MemoryRouter>
        <UserNav isAuth={AuthStatus.NoAuth} />
      </MemoryRouter>
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
  it('should call logout on sign out click', () => {
    render(
      <MemoryRouter>
        <UserNav isAuth={AuthStatus.Auth} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/sign out/i));

    expect(mockDispatch).toHaveBeenCalled();
  });

});
