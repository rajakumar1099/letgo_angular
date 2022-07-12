import { createAction, props } from '@ngrx/store';
import { Categories, CategoriesActionTypes } from '../types/categories.types';

export const GetCategories = createAction(CategoriesActionTypes.GetCategories);
export const AllCategories = createAction(
  CategoriesActionTypes.AllCategories,
  props<{ categories: Categories[] }>()
);
export const ErrorCategories = createAction(
  CategoriesActionTypes.ErrorCategories,
  props<{ error: string | null }>()
);
