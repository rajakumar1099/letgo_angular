import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { Categories } from '../types/categories.types';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private angularFirestore: AngularFirestore
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.GetCategories),
      switchMap(() => {
        return this.angularFirestore
          .collection(Constants.TAG_CATEGORIES)
          .valueChanges()
          .pipe(
            map((res) => {
              return CategoriesActions.AllCategories({
                categories: res as Categories[],
              });
            })
          );
      })
    )
  );
}
