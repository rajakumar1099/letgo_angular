import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from '../types/auth.types';

export const GetUser = createAction(AuthActionTypes.Get);
export const Authenticated = createAction(
  AuthActionTypes.Authenticated,
  props<{ userDetails: any }>()
);
export const Login = createAction(
  AuthActionTypes.Login,
  props<{ payload: any }>()
);
export const SignUp = createAction(
  AuthActionTypes.SignUp,
  props<{ payload: any }>()
);
export const Logout = createAction(AuthActionTypes.Logout);
export const Error = createAction(
  AuthActionTypes.Error,
  props<{ error: string }>()
);
