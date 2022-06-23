import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/utils/constants';
import { SIGNUPFORM } from '../types/auth.types';
import 'firebase/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ADDPRODUCT } from 'src/app/components/add-product/core/types/add-products.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private translate: TranslateService,
    private angularFirestore: AngularFirestore
  ) {}

  public convertTimestamp(): string {
    const timestamp = new Date().getTime();
    const time = new Date(timestamp).toLocaleTimeString('en-GB');
    const date = new Date(timestamp).toLocaleDateString('en-GB');
    return `${time} ${date}`;
  }

  public checkFormIsValid(form: FormGroup, control: string): boolean {
    return !!form.controls[control].valid;
  }

  public getTranslationErrorMessage(form: FormGroup, control: string): string {
    if (form.controls[control].hasError('required')) {
      return this.translate.instant('validators.thisFieldIsRequired');
    } else {
      switch (control) {
        case SIGNUPFORM.USERNAME: {
          if (form.controls[SIGNUPFORM.USERNAME].hasError('minlength')) {
            return this.translate.instant('validators.minLengthError');
          } else {
            return this.translate.instant('validators.maxLengthError');
          }
        }
        case SIGNUPFORM.EMAIL: {
          if (form.controls[SIGNUPFORM.EMAIL].hasError('email')) {
            return this.translate.instant('validators.invalidEmailError');
          } else {
            return this.translate.instant('validators.thisFieldIsRequired');
          }
        }
        case SIGNUPFORM.PASSWORD: {
          if (form.controls[SIGNUPFORM.PASSWORD].hasError('minlength')) {
            return this.translate.instant('validators.minPasswordError');
          } else {
            return this.translate.instant('validators.maxPasswordError');
          }
        }
        case SIGNUPFORM.CONFIRMPASSWORD: {
          if (form.controls[SIGNUPFORM.CONFIRMPASSWORD].hasError('minlength')) {
            return this.translate.instant('validators.minPasswordError');
          } else if (
            form.controls[SIGNUPFORM.CONFIRMPASSWORD].hasError('maxlength')
          ) {
            return this.translate.instant('validators.maxPasswordError');
          } else {
            return this.translate.instant('validators.passwordMatchError');
          }
        }
        /* case ADDPRODUCT.PRODUCT_TITLE: {
          if(form.controls[ADDPRODUCT.PRODUCT_TITLE]).hasError
        } */
        default: {
          return this.translate.instant('errors.somethingWentWrong');
        }
      }
    }
  }

  public getFirebaseErrorMessages(errTAG: string | null): string {
    switch (true) {
      case errTAG?.includes(Constants.TAG_FIREBASE_USER_NOT_FOUND): {
        return this.translate.instant('errors.userNotFound');
      }
      case errTAG?.includes(
        Constants.TAG_FIREBASE_SIGNUP_EMAIL_ALREADY_EXIST
      ): {
        return this.translate.instant('errors.emailAlreadyInUse');
      }
      case errTAG?.includes(
        Constants.TAG_FIREBASE_LOGIN_USER_PASSWORD_INVALID
      ): {
        return this.translate.instant('errors.passwordInvalid');
      }
      case errTAG?.includes(Constants.TAG_FIREBASE_TOO_MANY_REQUEST): {
        return this.translate.instant('errors.tooManyRequest');
      }
      default:
        return this.translate.instant('errors.somethingWentWrong');
    }
  }

  public updateData(
    user: firebase.default.User | null,
    key: string,
    value: string
  ) {
    if (!user) return;
    this.angularFirestore.doc(`${Constants.TAG_USERS}/${user?.uid}`).update({
      [key]: value,
    });
  }
}
