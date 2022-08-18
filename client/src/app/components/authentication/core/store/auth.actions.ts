import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '../types/auth.types';

export const GetUser = createAction(AuthActionTypes.Get, props<{ userDetails?: any, authToken?: any }>());
export const LoginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ userDetails: any, authToken: any }>(),
);
export const Login = createAction(
  AuthActionTypes.Login,
  props<{ payload: any }>()
);
export const LoginWithUid = createAction(
  AuthActionTypes.LoginWithUid,
  props<{ uid: string }>()
);
export const SignUp = createAction(
  AuthActionTypes.SignUp,
  props<{ payload: any }>()
);
export const Logout = createAction(AuthActionTypes.Logout);
export const Error = createAction(
  AuthActionTypes.Error,
  props<{ error: string | null }>()
);
