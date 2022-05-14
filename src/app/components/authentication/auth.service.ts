import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AesEncryptDecryptService } from 'src/app/utils/aes-encrypt-decrypt-service/aes-encrypt-decrypt.service';
import { Constants } from 'src/app/utils/constants';
import { LOGINFORM, SIGNUPFORM, UserDetails } from './types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private translate: TranslateService,
    private aesEncryptDecryptService: AesEncryptDecryptService
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem(Constants.TAG_USERS_UID, JSON.stringify(user.uid));
        JSON.parse(localStorage.getItem(Constants.TAG_USERS_UID)!);
        this.updateData(user.uid,Constants.TAG_LAST_LOGIN_TIME_STAMP, this.aesEncryptDecryptService.encryptText(this.convertTimestamp()))
      } else {
        localStorage.setItem(Constants.TAG_USERS_UID, 'null');
        JSON.parse(localStorage.getItem(Constants.TAG_USERS_UID)!);
      }
    });
  }

  public async signUp(formValue: FormGroup): Promise<void> {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(
        formValue.controls[SIGNUPFORM.EMAIL].value,
        formValue.controls[SIGNUPFORM.PASSWORD].value
      )
      .then((result) => {
        this.setSignUpData(result.user, formValue);
      });
  }

  public convertTimestamp(): string {
    const timestamp = new Date().getTime();
    const time = new Date(timestamp).toLocaleTimeString('en-GB');
    const date = new Date(timestamp).toLocaleDateString('en-GB');
    return `${time} ${date}`;
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem(Constants.TAG_USERS_UID)!);
    return user !== null ? true : false;
  }

  private async setSignUpData(user: any, formValue: FormGroup): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `${Constants.TAG_USERS}/${user.uid}`
    );
    const userData: UserDetails = {
      uid: user.uid,
      email: formValue.controls[SIGNUPFORM.EMAIL].value,
      fullname: this.aesEncryptDecryptService.encryptText(
        formValue.controls[SIGNUPFORM.NAME].value
      ),
      username: this.aesEncryptDecryptService.encryptText(
        formValue.controls[SIGNUPFORM.USERNAME].value
      ),
      password: this.aesEncryptDecryptService.encryptText(
        formValue.controls[SIGNUPFORM.PASSWORD].value
      ),
      registerTimestamp: this.aesEncryptDecryptService.encryptText(
        this.convertTimestamp()
      ),
      lastLoginTimestamp: this.aesEncryptDecryptService.encryptText(
        this.convertTimestamp()
      ),
    };
    return userRef.set(userData);
  }

  public async signIn(formValue: FormGroup) {
    return this.angularFireAuth.signInWithEmailAndPassword(
      formValue.controls[LOGINFORM.EMAIL].value,
      formValue.controls[LOGINFORM.PASSWORD].value
    );
  }

  public async updateData(uid: string, key: string, value: string): Promise<void> {
    if (uid) {
      const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
        `${Constants.TAG_USERS}/${uid}`
      );
      await userRef.update({
        [key]: value,
      });
    }
  }

  public async signOut(): Promise<void> {
    await this.angularFireAuth.signOut();
    localStorage.removeItem(Constants.TAG_USERS);
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
        default: {
          return this.translate.instant('errors.somethingWentWrong');
        }
      }
    }
  }

  public getFirebaseErrorMessages(errTAG: string): string {
    switch (true) {
      case errTAG.includes(Constants.TAG_FIREBASE_USER_NOT_FOUND): {
        return this.translate.instant('errors.userNotFound');
      }
      case errTAG.includes(Constants.TAG_FIREBASE_SIGNUP_EMAIL_ALREADY_EXIST): {
        return this.translate.instant('errors.emailAlreadyInUse');
      }
      case errTAG.includes(
        Constants.TAG_FIREBASE_LOGIN_USER_PASSWORD_INVALID
      ): {
        return this.translate.instant('errors.passwordInvalid');
      }
      case errTAG.includes(Constants.TAG_FIREBASE_TOO_MANY_REQUEST): {
        return this.translate.instant('errors.tooManyRequest');
      }
      default:
        return this.translate.instant('errors.somethingWentWrong');
    }
  }
}
