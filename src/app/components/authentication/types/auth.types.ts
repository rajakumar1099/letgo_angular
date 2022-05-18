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

export interface UserDetails {
  fullname: string;
  username: string;
  uid: string;
  email: string;
  password: string;
  displayPictureUrl?: string;
  registerTimestamp?: string;
  lastLoginTimestamp?: string;
}
