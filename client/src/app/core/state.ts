import { Features } from './features';
import * as fromUser from '../components/authentication/core/store/auth.reducer';
import * as fromCategories from '../components/categories/core/store/categories.reducer';
import * as fromProducts from '../components/home/core/store/products.reducer';
import * as fromAddProduct from '../components/add-product/core/store/add-products.reducer';
import * as fromComments from '../components/home/core/store/products.reducer';
import { AuthState } from '../components/authentication/core/types/auth.types';
import { CategoriesState } from '../components/categories/core/types/categories.types';
import { CommentState, ProductsState, ProductState } from '../components/home/core/types/home.types';
import { AddProductState } from '../components/add-product/core/types/add-products.types';

export interface AppState {
  [Features.Auth]: AuthState;
  [Features.Categories]: CategoriesState;
  [Features.Products]: ProductsState;
  [Features.Product]: ProductState;
  [Features.AddProduct]: AddProductState;
  [Features.Comments]: CommentState;
}

export const AppReducers = {
  [Features.Auth]: fromUser.authReducer,
  [Features.Categories]: fromCategories.categoriesReducer,
  [Features.Products]: fromProducts.productsReducer,
  [Features.Product]: fromProducts.productReducer,
  [Features.AddProduct]: fromAddProduct.addProductsReducer,
  [Features.Comments]: fromComments.commentReducer,
};
