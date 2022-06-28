import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Features } from 'src/app/core/features';
import { AesEncryptDecryptService } from 'src/app/utils/aes-encrypt-decrypt-service/aes-encrypt-decrypt.service';
import { signUpFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../core/services/auth.service';
import * as AuthActions from '../core/store/auth.actions';
import { getAuth } from '../core/store/auth.selector';
import { SIGNUPFORM, AuthState } from '../core/types/auth.types';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit {
  public form!: FormGroup;
  public readonly signUpForm = SIGNUPFORM;
  public hidePassword = true;
  public hideConfirmPassword = true;
  public showConfirmPassword = false;
  public firebaseAuthError!: string;
  public signUp$!: Observable<AuthState>;

  constructor(
    private dialog: MatDialogRef<SignUpDialogComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store<{ [Features.Auth]: AuthState }>,
    private aesEncryptDecryptService: AesEncryptDecryptService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.signUp$ = this.store.select(getAuth).pipe(
      tap((res) => {
        if (res?.user) this.closeDialog();
        if (res?.error) this.form.enable();
        this.firebaseAuthError = res?.error ?? ''
      })
    );
  }

  private createFormGroup() {
    this.form = this.formBuilder.group(signUpFormValidator, {
      validators: (control: any) => {
        if (
          control.value[SIGNUPFORM.PASSWORD] &&
          control.value[SIGNUPFORM.PASSWORD] !==
            control.value[SIGNUPFORM.CONFIRMPASSWORD]
        ) {
          this.form.controls[SIGNUPFORM.CONFIRMPASSWORD].setErrors({
            notSame: true,
          });
        }
        return null;
      },
    });
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }

  public closeDialog(): void {
    this.dialog.close();
    this.form.reset();
  }

  public handleDialogSignUp(): void {
    this.form.disable();
    this.store.dispatch(
      AuthActions.SignUp({
        payload: {
          email: this.form.controls[SIGNUPFORM.EMAIL].value,
          fullname: this.form.controls[SIGNUPFORM.NAME].value,
          username: this.form.controls[SIGNUPFORM.USERNAME].value,
          password: this.aesEncryptDecryptService.encryptText(
            this.form.controls[SIGNUPFORM.PASSWORD].value
          ),
          registerTimestamp: this.authService.convertTimestamp(),
          lastLoginTimestamp: this.authService.convertTimestamp(),
        },
      })
    );
  }
}
