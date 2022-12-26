import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CommonService } from 'src/app/core/common/services/common.service';
import { States } from 'src/app/core/features';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from '../../authentication/core/services/auth.service';
import { AuthState } from '../../authentication/core/types/auth.types';
import {
  EditProfileForm,
  editProfileFormValidator,
} from '../../home/core/types/home.types';
import { UserService } from '../core/services/user.service';
import * as UserProfileActions from '../core/store/user.actions';
import { getProfile } from '../core/store/user.selector';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public form!: FormGroup;
  public EditProfileForm = EditProfileForm;
  public user$!: Observable<AuthState>;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private store: Store<{
      [States.Auth]: AuthState;
      [States.Profile]: AuthState;
    }>,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(getProfile).pipe(
      map((res) => {
        this.form.controls[EditProfileForm.NAME].setValue(res.user?.fullname);
        this.form.controls[EditProfileForm.FULLNAME].setValue(
          res.user?.fullname
        );
        this.form.controls[EditProfileForm.USERNAME].setValue(
          res.user?.username
        );
        this.form.controls[EditProfileForm.EMAIL].setValue(res.user?.email);
        this.form.controls[EditProfileForm.EMAIL].disable();
        this.form.controls[EditProfileForm.LOCATION].setValue(res.user?.location);
        this.form.controls[EditProfileForm.PHONE].setValue(res.user?.phoneNumber);
        return res;
      })
    );
    this.form = this.formBuilder.group(editProfileFormValidator);
    this.form.reset();
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.userService.getFormErrorMessage(this.form, control);
  }

  public save() {
    const payloadData = {
      uid: this.commonService.getLocalStorageData(Constants.TAG_UID),
      fullname: this.form.controls[EditProfileForm.FULLNAME].value,
      username: this.form.controls[EditProfileForm.USERNAME].value,
      email: this.form.controls[EditProfileForm.EMAIL].value,
      location: this.form.controls[EditProfileForm.LOCATION].value,
      phoneNumber: this.form.controls[EditProfileForm.PHONE].value,
    };
    this.store.dispatch(
      UserProfileActions.ProfileUpdateRequest({ payload: payloadData })
    );
  }

  public checkIfRequired(control: string): Boolean {
    const validator = this.form.controls[control].validator
      ? this.form?.get(control)?.validator!({} as AbstractControl)
      : '';
    if (validator && validator['required']) {
      return true;
    }
    return false;
  }

  public handleAddressChange(address: Address) {
    this.form.controls[EditProfileForm.LOCATION].setValue(
      address.formatted_address
    );
  }
}
