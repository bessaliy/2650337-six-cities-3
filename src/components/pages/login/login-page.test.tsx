import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LoginPage from './login-page';
import { AuthStatus } from '../../../const';
import { setLoginError } from '../../../store/user/user-slice';

type MockState = {
  user: {
    loginError: string | null;
    authorizationStatus: AuthStatus;
  };
};

const mockState: MockState = {
  user: {
    loginError: null,
    authorizationStatus: AuthStatus.NoAuth,
  },
};

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: MockState) => unknown) =>
    mockUseSelector(selector) as ReturnType<typeof selector>,
}));

vi.mock('../../layout/header.tsx', () => ({
  default: () => <div data-testid="header" />,
}));

describe('Component: LoginPage', () => {

  beforeEach(() => {
    mockDispatch.mockReset();
    mockUseSelector.mockReset();
    mockNavigate.mockReset();
  });

  it('should render login form', () => {
    mockState.user.authorizationStatus = AuthStatus.NoAuth;
    mockState.user.loginError = null;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show error for invalid password', () => {
    mockState.user.authorizationStatus = AuthStatus.NoAuth;
    mockState.user.loginError = null;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'abcdef' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockDispatch).toHaveBeenCalledWith(
      setLoginError('Пароль должен содержать буквы и цифры')
    );
  });

  it('should dispatch login on valid submit', () => {
    mockState.user.authorizationStatus = AuthStatus.NoAuth;
    mockState.user.loginError = null;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'abc123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockDispatch).toHaveBeenNthCalledWith(
      2,
      expect.any(Function)
    );
  });

  it('should redirect when authorized', () => {
    mockState.user.authorizationStatus = AuthStatus.Auth;
    mockState.user.loginError = null;

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });

});
