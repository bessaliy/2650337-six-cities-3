import userReducer, {
  setAuthorizationStatus,
  setUserEmail,
  setLoginError
} from './user-slice';
import { AuthStatus } from '../../const';

describe('userSlice reducer', () => {
  const initialState = {
    authorizationStatus: AuthStatus.Unknown,
    userEmail: null,
    loginError: null,
  };
  it('should return initial state with empty action', () => {
    const result = userReducer(undefined, {type: ''});

    expect(result).toEqual(initialState);
  });
  it('should set authorization status', () => {
    const result = userReducer(initialState, setAuthorizationStatus(AuthStatus.Auth));

    expect(result.authorizationStatus).toBe(AuthStatus.Auth);
  });
  it('should set user email', () => {
    const result = userReducer(initialState, setUserEmail('bess@mail.com'));

    expect(result.userEmail).toBe('bess@mail.com');
  });
  it('should set login error', () => {
    const result = userReducer(initialState, setLoginError('error occurred'));

    expect(result.loginError).toBe('error occurred');
  });
});
