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
