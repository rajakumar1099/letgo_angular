import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { signUpFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../auth.service';
import { SIGNUPFORM } from '../types/auth.types';

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
  public loading = false;
  public firebaseAuthError: string | undefined;
  constructor(
    private dialog: MatDialogRef<SignUpDialogComponent>,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group(signUpFormValidator, {
      validators: (control) => {
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
    this.form.enable();
    this.form.reset();
  }

  public handleDialogSignUp(): void {
    this.loading = true;
    this.form.disable();
    this.authService
      .signUp(this.form)
      .then(() => {
        this.loading = false;
        this.authService.signIn(this.form).then(() => {
          this.closeDialog();
        });
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
