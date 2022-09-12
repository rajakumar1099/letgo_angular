import { createAction, props } from '@ngrx/store';
import { Products } from 'src/app/components/home/core/types/home.types';
import { UserActionTypes } from '../type/user.types';

export const GetProfile = createAction(
  UserActionTypes.GetProfile,
  props<{ uid: string }>()
);

export const ProfileUpdateRequest = createAction(
  UserActionTypes.ProfileUpdateRequest,
  props<{ payload: any }>()
);

export const ProfileUpdateSuccess = createAction(
  UserActionTypes.ProfileUpdateSuccess,
  props<{ profile: any }>()
);

export const ProfileUpdateFailed = createAction(
  UserActionTypes.ProfileUpdateFailed,
  props<{ error: string | null }>()
);

export const GetMyListing = createAction(
  UserActionTypes.GetMyListing,
  props<{ payload: any }>()
);

export const MyListingSuccess = createAction(
  UserActionTypes.MyListingSuccess,
  props<{ products: Products[]  }>()
);

export const MyListingFailed = createAction(
  UserActionTypes.MyListingFailed,
  props<{ error: string | null }>()
);
