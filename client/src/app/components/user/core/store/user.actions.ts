import { createAction, props } from '@ngrx/store';
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
