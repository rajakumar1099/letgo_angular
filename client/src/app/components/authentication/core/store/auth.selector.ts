import { createFeatureSelector, createSelector } from '@ngrx/store';
import { States } from 'src/app/core/features';
import { AuthState } from '../types/auth.types';

const getAuthState = createFeatureSelector<AuthState>(States.Auth);
export const getAuth = createSelector(getAuthState, (state) => {
  return state;
});
