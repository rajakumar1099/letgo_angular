import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth.types';
import * as AuthActions from './auth.actions';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthActions.GetUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.LoginSuccess, (state, action) => ({
    ...state,
    user: action.userDetails,
    loading: false,
  })),
  on(AuthActions.Login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.SignUp, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.Logout, (state) => ({
    ...state,
    ...initialState,
    loading: true,
  })),
  on(AuthActions.Error, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
