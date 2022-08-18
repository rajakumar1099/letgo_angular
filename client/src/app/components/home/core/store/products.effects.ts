import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { Routes } from 'src/app/core/common/common.types';
import { HomeService } from '../services/home.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private homeService: HomeService, private router: Router) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      switchMap((payload) => {
        return this.homeService.getHomeData().pipe(
          map((res: any) => {
            if(payload?.route){
              this.router.navigate([Routes.PRODUCTS]);
            }
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

  deleteProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.DeleteProduct),
    switchMap((payload) => {
      return this.homeService.deleteProduct(payload.product_uid).pipe(
        map((res: any) => {
          return ProductsActions.GetProducts({route: true})
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

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetComments),
      switchMap((payload) => {
        return this.homeService.getComments(payload.product_uid).pipe(
          map((res: any) => {
            return ProductsActions.LoadCommentsSuccess({
              data: res?.data,
            });
          }),
          catchError((err) => {
            return of(
              ProductsActions.LoadCommentsFailed({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );

  deleteComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteComments),
      switchMap((payload) => {
        return this.homeService.deleteComments(payload.product_uid, payload.id).pipe(
          map((res: any) => {
            return ProductsActions.GetComments({
              product_uid: payload.product_uid,
            });
          }),
          catchError((err) => {
            return of(
              ProductsActions.LoadCommentsFailed({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );

  addComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.AddComments),
      switchMap((payload) => {
        return this.homeService.addComments(payload.payload).pipe(
          map((res: any) => {
            return ProductsActions.GetComments({
              product_uid: payload.payload.product_uid
            });
          }),
          catchError((err) => {
            return of(
              ProductsActions.LoadCommentsFailed({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );
}
