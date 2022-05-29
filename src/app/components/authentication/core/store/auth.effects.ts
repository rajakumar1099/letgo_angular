import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Constants } from 'src/app/utils/constants';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthDetails } from '../types/auth.types';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetUser),
      switchMap(() => {
        return this.angularFireAuth.authState.pipe(
          switchMap((user) => {
            this.authService.updateData(
              user,
              Constants.TAG_LAST_LOGIN_TIME_STAMP,
              this.authService.convertTimestamp()
            );
            return this.angularFirestore
              .collection(Constants.TAG_USERS)
              .doc(user?.uid)
              .valueChanges()
              .pipe(
                map((userDetails) => {
                  return AuthActions.Authenticated({
                    userDetails: userDetails,
                  });
                })
              );
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      switchMap(async (action) => {
        try {
          await this.angularFireAuth.signInWithEmailAndPassword(
            action.payload.email,
            action.payload.password
          );
          return AuthActions.GetUser();
        } catch (err: any) {
          return AuthActions.Error({ error: err.message });
        }
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SignUp),
      switchMap(async (action) => {
        try {
          await this.angularFireAuth
            .createUserWithEmailAndPassword(
              action.payload.email,
              action.payload.password
            )
            .then(async (res) => {
              const userData: AuthDetails = {
                uid: res?.user?.uid ?? null,
                email: action.payload.email,
                fullname: action.payload.fullname,
                username: action.payload.username,
                password: action.payload.password,
                registerTimestamp: action.payload.registerTimestamp,
                lastLoginTimestamp: action.payload.lastLoginTimestamp,
              };
              await this.angularFirestore
                .doc(`${Constants.TAG_USERS}/${res?.user?.uid}`)
                .set(userData);
            });
          return AuthActions.GetUser();
        } catch (err: any) {
          return AuthActions.Error({ error: err.message });
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Logout),
      switchMap(async () => {
        try {
          await this.angularFireAuth.signOut().then(() => {
            localStorage.removeItem(Constants.TAG_USER_DATA);
          });
          return AuthActions.GetUser();
        } catch (err: any) {
          return AuthActions.Error({ error: err.message });
        }
      })
    )
  );
}