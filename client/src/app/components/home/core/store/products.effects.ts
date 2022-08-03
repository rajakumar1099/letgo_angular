import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { HomeService } from '../services/home.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      switchMap(() => {
        return this.homeService.getHomeData().pipe(
          map((res: any) => {
            return ProductsActions.AllProducts({
              products: res?.data?.products,
            });
          }),
          catchError((err) => {
            return of(
              ProductsActions.ErrorProducts({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );

  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProduct),
      switchMap((payload) => {
        return this.homeService.getProductData(payload.product_uid).pipe(
          map((res: any) => {
            return ProductsActions.ProductLoadSuccess({
              products: res?.data?.products,
            });
          }),
          catchError((err) => {
            return of(
              ProductsActions.ProductLoadFailed({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );

  clearProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.ProductClearStore),
      map(() => {
        return ProductsActions.ProductLoadSuccess({
          products: null,
        });
      })
    )
  );
}
