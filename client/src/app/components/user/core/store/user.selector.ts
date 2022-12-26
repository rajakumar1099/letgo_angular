import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/components/authentication/core/types/auth.types';
import { ProductsState } from 'src/app/components/home/core/types/home.types';
import { States } from 'src/app/core/features';

const getProfileState = createFeatureSelector<AuthState>(States.Profile);
const getListingState = createFeatureSelector<ProductsState>(States.Listing);
export const getProfile = createSelector(getProfileState, (state) => {
  return state;
});
export const getListing = createSelector(getListingState, (state) => {
  return state;
});
