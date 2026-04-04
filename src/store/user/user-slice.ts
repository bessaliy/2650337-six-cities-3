import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthStatus } from '../../const';

type UserState = {
  authorizationStatus: AuthStatus;
  userEmail: string | null;
  loginError: string | null;
};

const initialState: UserState = {
  authorizationStatus: AuthStatus.Unknown,
  userEmail: null,
  loginError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string | null>) {
      state.userEmail = action.payload;
    },
    setLoginError(state, action: PayloadAction<string | null>) {
      state.loginError = action.payload;
    },
  },
});

export const {
  setAuthorizationStatus,
  setUserEmail,
  setLoginError
} = userSlice.actions;

export default userSlice.reducer;
