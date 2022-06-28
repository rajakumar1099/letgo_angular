export const USERNAME_MIN_COUNT = 4;
export const USERNAME_MAX_COUNT = 20;
export const PASSWORD_MIN_COUNT = 6;
export const PASSWORD_MAX_COUNT = 30;
export enum SIGNUPFORM {
  NAME = 'name',
  USERNAME = 'username',
  EMAIL = 'emailAddress',
  PASSWORD = 'password',
  CONFIRMPASSWORD = 'confirmPassword',
}

export enum LOGINFORM {
  EMAIL = 'emailAddress',
  PASSWORD = 'password',
  REMEMBERME = 'rememberMe',
}

export const AuthActionTypes = {
  Get: '[Auth] Get User',
  Authenticated: '[Auth] Authenticated',
  NotAuthenticated: '[Auth] Not Authenticated',
  Login: '[Auth] Login',
  SignUp: '[Auth] Signup',
  Logout: '[Auth] Logout',
  Error: '[Auth] Error',
};

export interface AuthDetails {
  fullname: string | null;
  username: string | null;
  uid: string | null;
  email: string | null;
  password: string | null;
  displayPictureUrl?: string | null;
  registerTimestamp?: string | null;
  lastLoginTimestamp?: string | null;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: AuthDetails | null;
  authToken: string | null
}
