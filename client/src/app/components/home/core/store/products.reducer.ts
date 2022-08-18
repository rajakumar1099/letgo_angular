import { createReducer, on } from '@ngrx/store';
import { CommentState, ProductsState, ProductState } from '../types/home.types';
import * as ProductActions from './products.actions';

const initialProductsState: ProductsState = {
  loading: false,
  error: null,
  products: null,
};

const initialProductState: ProductState = {
  loading: false,
  error: null,
  product: null,
};

const initialCommentState: CommentState = {
  loading: false,
  error: null,
  data: null,
};


export const productsReducer = createReducer<ProductsState>(
  initialProductsState,
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

export const productReducer = createReducer<ProductState>(
  initialProductState,
  on(ProductActions.GetProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.DeleteProduct, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.ProductLoadSuccess, (state, action) => ({
    ...state,
    product: action.products,
    loading: false,
  })),
  on(ProductActions.ProductLoadFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(ProductActions.ProductClearStore, (state, action) => ({
    ...initialProductState,
  }))
);

export const commentReducer = createReducer<CommentState>(
  initialCommentState,
  on(ProductActions.GetComments, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.DeleteComments, (state) => ({
    ...initialCommentState,
    loading: true,
  })),
  on(ProductActions.LoadCommentsSuccess, (state, action) => ({
    ...state,
    data: action.data,
    loading: false,
  })),
  on(ProductActions.ProductLoadFailed, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(ProductActions.AddComments, (state, action) => ({
    ...state,
    loading: true,
  }))
);