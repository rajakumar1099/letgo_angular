// import { createReducer, on } from '@ngrx/store';
// import { CategoriesState } from '../types/categories.types';
// import * as CategoriesActions from './products.actions';

// const initialCategoriesState: CategoriesState = {
//   loading: true,
//   error: null,
//   categories: null,
// };

// export const categoriesReducer = createReducer<CategoriesState>(
//   initialCategoriesState,
//   on(CategoriesActions.GetCategories, (state) => ({
//     ...state,
//     loading: true,
//   })),
//   on(CategoriesActions.AllCategories, (state, action) => ({
//     ...state,
//     categories: action.categories,
//     loading: false,
//   })),
//   on(CategoriesActions.ErrorCategories, (state, action) => ({
//     ...state,
//     error: action.error,
//     loading: false,
//   }))
// );
