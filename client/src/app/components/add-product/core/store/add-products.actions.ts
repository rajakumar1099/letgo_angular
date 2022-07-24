import { createAction, props } from '@ngrx/store';
import { AddProduct, AddProductActionTypes } from '../types/add-products.types';

export const AddProductRequest = createAction(
  AddProductActionTypes.AddProductRequest,
  props<{ addProduct: any }>()
);
export const AddProductSuccess = createAction(
  AddProductActionTypes.AddProductSuccess,
  props<{ addProduct: any }>()
);
export const AddProductError = createAction(
  AddProductActionTypes.ErrorProductFailure,
  props<{ error: string | null }>()
);
