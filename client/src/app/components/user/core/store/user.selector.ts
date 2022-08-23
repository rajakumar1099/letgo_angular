import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/components/authentication/core/types/auth.types';
import { States } from 'src/app/core/features';

const getProfileState = createFeatureSelector<AuthState>(States.Profile);
export const getProfile = createSelector(getProfileState, (state) => {
  return state;
});
