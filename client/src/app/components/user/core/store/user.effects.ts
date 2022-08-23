import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetProfile),
      switchMap((action) => {
        return this.userService.getProfileData(action.uid).pipe(
          map((res: any) => {
            return UserActions.ProfileUpdateSuccess({
              profile: res.data,
            });
          }),
          catchError((err) => {
            return of(
              UserActions.ProfileUpdateFailed({ error: err.error.data.message })
            );
          })
        );
      })
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.ProfileUpdateRequest),
      switchMap((action) => {
        return this.userService.updateProfile(action.payload).pipe(
          map((res: any) => {
            this.toastr.success(this.translate.instant('toastr.profileUpdateSuccess'), this.translate.instant('toastr.success'));
            return UserActions.ProfileUpdateSuccess({
              profile: res.data,
            });
          }),
          catchError((err) => {
            this.toastr.error(this.translate.instant('toastr.profileUpdateFailed'), this.translate.instant('toastr.failed'));
            return of(
              UserActions.ProfileUpdateFailed({ error: err.error.data.message })
            );
          })
        );
      })
    )
  );
}
