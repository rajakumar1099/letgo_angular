import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProductsState } from 'src/app/components/home/core/types/home.types';
import { Features } from 'src/app/core/features';
import { AddProductService } from '../service/add-product.service';
import * as AddProductActions from './add-products.actions';
import * as ProductsAction from '../../../home/core/store/products.actions';
import { Router } from '@angular/router';
import { Routes } from 'src/app/core/common/common.types';

@Injectable()
export class AddProductsEffects {
  constructor(
    private actions$: Actions,
    private addProductService: AddProductService,
    private store: Store<{
      [Features.Products]: ProductsState;
    }>,
    private router: Router
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddProductActions.AddProductRequest),
      switchMap((payload) => {
        return this.addProductService.createProduct(payload.addProduct).pipe(
          map((res: any) => {
            this.store.dispatch(ProductsAction.GetProducts());
            this.router.navigateByUrl(Routes.HOME);
            return AddProductActions.AddProductSuccess({
              addProduct: res?.data?.product,
            });
          }),
          catchError((err) => {
            return of(
              AddProductActions.AddProductError({
                error: err?.error?.data?.message,
              })
            );
          })
        );
      })
    )
  );
}
