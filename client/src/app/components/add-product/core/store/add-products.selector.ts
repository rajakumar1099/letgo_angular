import { createFeatureSelector, createSelector } from '@ngrx/store';
import { States } from 'src/app/core/features';
import { AddProductState } from '../types/add-products.types';

const getAddProductsState = createFeatureSelector<AddProductState>(
  States.AddProduct
);
export const getAddProduct = createSelector(getAddProductsState, (state) => {
  return state;
});
