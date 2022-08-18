import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { CommentState, ProductsState, ProductState } from '../types/home.types';

const getProductsState = createFeatureSelector<ProductsState>(Features.Products);
const getProductState = createFeatureSelector<ProductState>(Features.Product);
const getCommentState = createFeatureSelector<CommentState>(Features.Comments);

export const getProducts = createSelector(getProductsState, (state) => {
  return state;
});
export const getProduct = createSelector(getProductState, (state) => {
  return state;
});
export const getComments = createSelector(getCommentState, (state) => {
  return state;
});
