import { createReducer, on } from '@ngrx/store';
import { ProductState } from '../types/home.types';
import * as ProductActions from './products.actions';

const initialProductState: ProductState = {
  loading: false,
  error: null,
  products: null,
};

export const productsReducer = createReducer<ProductState>(
  initialProductState,
  on(ProductActions.GetProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.AllProducts, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
  })),
  on(ProductActions.ErrorProducts, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
