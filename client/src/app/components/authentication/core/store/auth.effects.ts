import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Routes } from 'src/app/core/common/common.types';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetUser),
      switchMap((action) => {
        return of(
          AuthActions.LoginSuccess({
            userDetails: action.userDetails,
            authToken: action.authToken,
          })
        );
      })
    )
  );

  loginWithUid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginWithUid),
      switchMap((action) => {
        return this.authService.loginWithUid(action.uid).pipe(
          map((res: any) => {
            this.commonService.setLocalStorageData(Constants.TAG_AUTHORIZATION, res.data.Authorization);
            return AuthActions.GetUser({
              userDetails: res.data,
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

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      switchMap((action) => {
        return this.authService.login(action.payload).pipe(
          map((res: any) => {
            this.commonService.setLocalStorageData(Constants.TAG_UID, res.data.uid);
            this.commonService.setLocalStorageData(Constants.TAG_AUTHORIZATION, res.data.Authorization);
            return AuthActions.GetUser({
              userDetails: res.data,
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
            this.commonService.setLocalStorageData(Constants.TAG_UID, res.data.uid);
            this.commonService.setLocalStorageData(Constants.TAG_AUTHORIZATION, res.data.Authorization);
            return AuthActions.GetUser({
              userDetails: res.data,
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
          this.commonService.removeUserDetails(Constants.TAG_UID);
          this.commonService.removeUserDetails(Constants.TAG_AUTHORIZATION);
          this.router.navigate([Routes.PRODUCTS]);
          return AuthActions.GetUser({ userDetails: null });
        } catch (err: any) {
          return AuthActions.Error({ error: err.message });
        }
      })
    )
  );
}
