import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loginFormValidator } from 'src/app/utils/form-validators';
import { LOGINFORM, AuthState } from '../core/types/auth.types';
import * as AuthActions from '../core/store/auth.actions';
import { AuthService } from '../core/services/auth.service';
import { Features } from 'src/app/core/features';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getAuth } from '../core/store/auth.selector';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  public form!: FormGroup;
  public readonly loginForm = LOGINFORM;
  public loading = false;
  public hidePassword = true;
  public firebaseAuthError!: string;
  public login$!: Observable<AuthState>;

  constructor(
    private dialog: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<{ [Features.Auth]: AuthState }>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(loginFormValidator);
    this.login$ = this.store.select(getAuth).pipe(
      tap((res) => {
        if (res?.user) this.closeDialog();
        if (res?.error) this.form.enable();
        this.firebaseAuthError = res?.error ?? ''
      })
    );
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }

  public handleDialogLogin(): void {
    this.form.disable();
    this.store.dispatch(
      AuthActions.Login({
        payload: {
          email: this.form.controls[LOGINFORM.EMAIL].value,
          password: this.form.controls[LOGINFORM.PASSWORD].value,
          // remember: this.form.controls[LOGINFORM.REMEMBERME].value,
        },
      })
    );
  }

  public closeDialog(): void {
    this.dialog.close();
    this.form.reset();
  }
}
