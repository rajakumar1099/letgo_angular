import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { ProductsState, ProductState } from '../types/home.types';

const getProductsState = createFeatureSelector<ProductsState>(
  Features.Products
);
export const getProducts = createSelector(getProductsState, (state) => {
  return state;
});


const getProductState = createFeatureSelector<ProductState>(
  Features.Product
);
export const getProduct = createSelector(getProductState, (state) => {
  return state;
});
