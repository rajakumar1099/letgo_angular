import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { AuthState } from '../types/auth.types';

const getAuthState = createFeatureSelector<AuthState>(Features.Auth);
export const getAuth = createSelector(getAuthState, (state) => {
  return state;
});
