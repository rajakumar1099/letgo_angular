import { createAction, props } from '@ngrx/store';
import { Products, ProductsActionTypes } from '../types/home.types';

export const GetProducts = createAction(ProductsActionTypes.GetProducts);
export const AllProducts = createAction(
  ProductsActionTypes.AllProducts,
  props<{ products: Products[] }>()
);
export const ErrorProducts = createAction(
  ProductsActionTypes.ErrorProducts,
  props<{ error: string | null }>()
);

export const GetProduct = createAction(
  ProductsActionTypes.GetProduct,
  props<{ product_uid: string }>()
);
export const ProductLoadSuccess = createAction(
  ProductsActionTypes.ProductLoadSuccess,
  props<{ products: Products | null }>()
);
export const ProductLoadFailed = createAction(
  ProductsActionTypes.ProductLoadFailed,
  props<{ error: string | null }>()
);
export const ProductClearStore = createAction(ProductsActionTypes.ProductClearStore);

