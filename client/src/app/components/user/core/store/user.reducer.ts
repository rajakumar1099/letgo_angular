import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/components/authentication/core/types/auth.types';
import { ProductsState } from 'src/app/components/home/core/types/home.types';
import * as UserActions from './user.actions';

const initialProfileState: AuthState = {
  loading: false,
  error: null,
  user: null
};

const initialMyListingState: ProductsState = {
  loading: false,
  error: null,
  products: null
};

export const profileReducer = createReducer<AuthState>(
  initialProfileState,
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

export const myListingReducer = createReducer<ProductsState>(
  initialMyListingState,
  on(UserActions.GetMyListing, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.MyListingSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
  })),
  on(UserActions.ProfileUpdateFailed, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
