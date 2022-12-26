import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProductsState } from 'src/app/components/home/core/types/home.types';
import { States } from 'src/app/core/features';
import { AddProductService } from '../service/add-product.service';
import * as AddProductActions from './add-products.actions';
import * as ProductsAction from '../../../home/core/store/products.actions';
import { Router } from '@angular/router';
import { Routers } from 'src/app/core/common/common.types';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AddProductsEffects {
  constructor(
    private actions$: Actions,
    private addProductService: AddProductService,
    private store: Store<{
      [States.Products]: ProductsState;
    }>,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddProductActions.AddProductRequest),
      switchMap((payload) => {
        return this.addProductService.createProduct(payload.addProduct).pipe(
          map((res: any) => {
            this.store.dispatch(ProductsAction.GetProducts({}));
            this.router.navigate([Routers.PRODUCTS]);
            this.toastr.success(this.translate.instant('toastr.productPostedSucess'), this.translate.instant('toastr.success'));
            return AddProductActions.AddProductSuccess({
              addProduct: res?.data?.product,
            });
          }),
          catchError((err) => {
            this.toastr.error(this.translate.instant('toastr.productPostedFailed'), this.translate.instant('toastr.failed'));
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
