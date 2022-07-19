import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { ProductState } from '../types/home.types';

const getProductsState = createFeatureSelector<ProductState>(
  Features.Products
);
export const getProducts = createSelector(getProductsState, (state) => {
  return state.products;
});
