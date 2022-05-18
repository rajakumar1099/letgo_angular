import { FormControl, Validators } from '@angular/forms';
import {
  LOGINFORM,
  PASSWORD_MAX_COUNT,
  PASSWORD_MIN_COUNT,
  SIGNUPFORM,
  USERNAME_MAX_COUNT,
  USERNAME_MIN_COUNT,
} from '../components/authentication/types/auth.types';

export const signUpFormValidator = {
  [SIGNUPFORM.NAME]: new FormControl('', Validators.required),
  [SIGNUPFORM.USERNAME]: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(USERNAME_MIN_COUNT),
      Validators.maxLength(USERNAME_MAX_COUNT),
    ])
  ),
  [SIGNUPFORM.EMAIL]: new FormControl(
    '',
    Validators.compose([Validators.required, Validators.email])
  ),
  [SIGNUPFORM.PASSWORD]: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(PASSWORD_MIN_COUNT),
      Validators.maxLength(PASSWORD_MAX_COUNT),
    ])
  ),
  [SIGNUPFORM.CONFIRMPASSWORD]: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(PASSWORD_MIN_COUNT),
      Validators.maxLength(PASSWORD_MAX_COUNT),
    ])
  ),
};

export const loginFormValidator = {
  [LOGINFORM.EMAIL]: new FormControl(
    '',
    Validators.compose([Validators.required, Validators.email])
  ),
  [LOGINFORM.PASSWORD]: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(PASSWORD_MIN_COUNT),
      Validators.maxLength(PASSWORD_MAX_COUNT),
    ])
  ),
  [LOGINFORM.REMEMBERME]: new FormControl(false),
};
