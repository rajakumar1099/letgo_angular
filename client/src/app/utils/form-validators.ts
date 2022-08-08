import { FormControl, Validators } from '@angular/forms';
import { ADDPRODUCT } from '../components/add-product/core/types/add-products.types';
import {
  LOGINFORM,
  PASSWORD_MAX_COUNT,
  PASSWORD_MIN_COUNT,
  SIGNUPFORM,
  USERNAME_MAX_COUNT,
  USERNAME_MIN_COUNT,
} from '../components/authentication/core/types/auth.types';

export const signUpFormValidator = {
  [SIGNUPFORM.NAME]: new FormControl('', Validators.required),
  [SIGNUPFORM.FULLNAME]: new FormControl('', Validators.required),
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

export const addProductFormValidator = {
  [ADDPRODUCT.CATEGORY]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.SUB_CATEGORY]: new FormControl(
    '',
    Validators.compose([])
  ),
  [ADDPRODUCT.CHILD_CATEGORY]: new FormControl(
    '',
    Validators.compose([])
  ),
  [ADDPRODUCT.PRODUCT_TITLE]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.PRODUCT_DESCRIPTION]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.PRODUCT_LOCATION]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.PRODUCT_PRICE]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.CURRENCY]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
  [ADDPRODUCT.PRODUCT_IMAGES]: new FormControl('', Validators.compose([Validators.required])),
  [ADDPRODUCT.PRODUCT_VIDEO]: new FormControl(''),
}

export const commentFormValidator = {
  [ADDPRODUCT.COMMENT]: new FormControl(
    '',
    Validators.compose([Validators.required])
  ),
}
