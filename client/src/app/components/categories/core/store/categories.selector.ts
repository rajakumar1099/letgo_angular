import { createFeatureSelector, createSelector } from '@ngrx/store';
import { States } from 'src/app/core/features';
import { CategoriesState } from '../types/categories.types';

const getCategoriesState = createFeatureSelector<CategoriesState>(
  States.Categories
);
export const getCategories = createSelector(getCategoriesState, (state) => {
  return state.categories;
});
