import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/utils/constants';
import { loginFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../auth.service';
import { LOGINFORM } from '../types/auth.types';

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
  public firebaseAuthError: string | undefined;

  constructor(
    private dialog: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group(loginFormValidator);
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }

  public closeDialog(): void {
    this.dialog.close();
    this.form.enable();
    this.form.reset();
  }

  public handleDialogLogin(): void {
    this.loading = true;
    this.form.disable();
    this.authService
      .signIn(this.form)
      .then(() => {
        this.loading = false;
        this.closeDialog();
      })
      .catch((err) => {
        this.loading = false;
        this.firebaseAuthError = this.authService.getFirebaseErrorMessages(
          err.message
        );
        this.form.enable();
      });
  }
}
