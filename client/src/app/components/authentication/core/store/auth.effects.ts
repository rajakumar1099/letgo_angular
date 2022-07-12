import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { CommonService } from 'src/app/core/common/services/common.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetUser),
      switchMap((action) => {
        return of(
          AuthActions.Authenticated({
            userDetails: action.userDetails,
            authToken: action.authToken,
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      switchMap((action) => {
        return this.authService.login(action.payload).pipe(
          map((res: any) => {
            this.commonService.saveUserDetails(Constants.TAG_USER_DATA, res.data);
            return AuthActions.GetUser({
              userDetails: res.data.user,
              authToken: res.data.Authorization,
            });
          }),
          catchError((err) => {
            return of(AuthActions.Error({ error: err.error.data.message }));
          })
        );
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      switchMap((action) => {
        return this.authService.signup(action.payload).pipe(
          map((res: any) => {
            this.commonService.saveUserDetails(Constants.TAG_USER_DATA, res.data);
            return AuthActions.GetUser({
              userDetails: res.data.user,
              authToken: res.data.Authorization,
            });
          }),
          catchError((err) => {
            return of(AuthActions.Error({ error: err.error.data.message }));
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Logout),
      switchMap(async () => {
        try {
          this.commonService.removeUserDetails(Constants.TAG_USER_DATA);
          return AuthActions.GetUser({ userDetails: null });
        } catch (err: any) {
          return AuthActions.Error({ error: err.message });
        }
      })
    )
  );
}
