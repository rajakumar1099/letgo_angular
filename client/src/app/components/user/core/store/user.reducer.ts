import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/components/authentication/core/types/auth.types';
import * as UserActions from './user.actions';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null
};

export const profileReducer = createReducer<AuthState>(
  initialState,
  on(UserActions.GetProfile, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.ProfileUpdateRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.ProfileUpdateSuccess, (state, action) => ({
    ...state,
    user: action.profile,
    loading: false,
  })),
  on(UserActions.ProfileUpdateFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
