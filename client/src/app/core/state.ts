import { Features } from './features';
import * as fromUser from '../components/authentication/core/store/auth.reducer';
import * as fromCategories from '../components/categories/core/store/categories.reducer';
import * as fromProducts from '../components/home/core/store/products.reducer';
import { AuthState } from '../components/authentication/core/types/auth.types';
import { CategoriesState } from '../components/categories/core/types/categories.types';
import { ProductState } from '../components/home/core/types/home.types';

export interface AppState {
  [Features.Auth]: AuthState;
  [Features.Categories]: CategoriesState;
  [Features.Products]: ProductState;
}

export const AppReducers = {
  [Features.Auth]: fromUser.authReducer,
  [Features.Categories]: fromCategories.categoriesReducer,
  [Features.Products]: fromProducts.productsReducer,
};
