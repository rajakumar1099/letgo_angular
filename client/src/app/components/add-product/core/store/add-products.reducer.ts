import { createReducer, on } from '@ngrx/store';
import { AddProductState } from '../types/add-products.types';
import * as AddProductActions from './add-products.actions';

const initialProductState: AddProductState = {
  loading: false,
  error: null,
  addProduct: null,
};

export const addProductsReducer = createReducer<AddProductState>(
  initialProductState,
  on(AddProductActions.AddProductRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(AddProductActions.AddProductSuccess, (state, action) => ({
    ...state,
    products: action.addProduct,
    loading: false,
  })),
  on(AddProductActions.AddProductError, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
