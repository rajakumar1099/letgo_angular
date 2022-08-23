import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/app/utils/constants';
import { SIGNUPFORM } from '../types/auth.types';
import 'firebase/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { API } from 'src/app/utils/Api';
import { ADDPRODUCT } from 'src/app/components/add-product/core/types/add-products.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private translate: TranslateService,
    private angularFirestore: AngularFirestore,
    private http: HttpClient
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

  public getFormErrorMessage(form: FormGroup, control: string): string {
    if (form.controls[control].hasError('required')) {
      return this.translate.instant('validators.thisFieldIsRequired');
    } else if (form.controls[control].hasError('email')) {
      return this.translate.instant('validators.invalidEmailError');
    } else if (form.controls[control].hasError('pattern')) {
      return this.translate.instant('validators.invalidEmailError');
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
        case ADDPRODUCT.PRODUCT_IMAGES: {
          return 'Only 5 images can be uploaded';
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

  public login(payload: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return this.http.post(environment.baseURL + API.LOGIN, payload, options);
  }

  public loginWithUid(uid: String) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return this.http.get(environment.baseURL + API.LOGIN + '/' + uid, options);
  }

  public signup(payload: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    return this.http.post(environment.baseURL + API.SIGNUP, payload, options);
  }
}
