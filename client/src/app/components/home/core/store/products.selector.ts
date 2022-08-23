import { createFeatureSelector, createSelector } from '@ngrx/store';
import { States } from 'src/app/core/features';
import { CommentState, ProductsState, ProductState } from '../types/home.types';

const getProductsState = createFeatureSelector<ProductsState>(States.Products);
const getProductState = createFeatureSelector<ProductState>(States.Product);
const getCommentState = createFeatureSelector<CommentState>(States.Comments);

export const getProducts = createSelector(getProductsState, (state) => {
  return state;
});
export const getProduct = createSelector(getProductState, (state) => {
  return state;
});
export const getComments = createSelector(getCommentState, (state) => {
  return state;
});
