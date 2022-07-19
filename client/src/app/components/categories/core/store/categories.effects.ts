import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoriesService
  ) {}

  getCategories$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriesActions.GetCategories),
    switchMap(() => {
      return this.categoryService.getCategory().pipe(
        map((res: any) => {
          return CategoriesActions.AllCategories({
           categories: res.data.categories
          });
        }),
        catchError((err) => {
          return of(CategoriesActions.ErrorCategories({ error: err?.error?.data?.message }));
        })
      );
    })
  )
);
}
