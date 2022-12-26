import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { Routers } from 'src/app/core/common/common.types';
import { HomeService } from '../services/home.service';
import * as ProductsActions from './products.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      switchMap((payload) => {
        return this.homeService.getHomeData().pipe(
          map((res: any) => {
            if (payload?.route) {
              this.router.navigate([Routers.PRODUCTS]);
            }
            return ProductsActions.AllProducts({
              products: res?.data,
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
            this.toastr.success(this.translate.instant('toastr.productDeletedSuccess'), this.translate.instant('toastr.success'));
            return ProductsActions.GetProducts({ route: true });
          }),
          catchError((err) => {
            this.toastr.error(this.translate.instant('toastr.productDeleteFailed'), this.translate.instant('toastr.failed'));
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
        return this.homeService
          .deleteComments(payload.product_uid, payload.id)
          .pipe(
            map((res: any) => {
            this.toastr.success(this.translate.instant('toastr.commentDeletedSuccess'), this.translate.instant('toastr.success'));
              return ProductsActions.GetComments({
                product_uid: payload.product_uid,
              });
            }),
            catchError((err) => {
            this.toastr.error(this.translate.instant('toastr.commentDeleteFailed'), this.translate.instant('toastr.failed'));
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
            this.toastr.success(this.translate.instant('toastr.commentAddedSuccess'), this.translate.instant('toastr.success'));
            return ProductsActions.GetComments({
              product_uid: payload.payload.product_uid,
            });
          }),
          catchError((err) => {
            this.toastr.error(this.translate.instant('toastr.commentAddedFailed'), this.translate.instant('toastr.failed'));
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
