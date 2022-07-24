import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { AddProductState } from '../types/add-products.types';

const getAddProductsState = createFeatureSelector<AddProductState>(
  Features.AddProduct
);
export const getAddProduct = createSelector(getAddProductsState, (state) => {
  return state;
});
