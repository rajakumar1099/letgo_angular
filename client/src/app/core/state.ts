import { States } from './features';
import * as fromUser from '../components/authentication/core/store/auth.reducer';
import * as fromCategories from '../components/categories/core/store/categories.reducer';
import * as fromProducts from '../components/home/core/store/products.reducer';
import * as fromAddProduct from '../components/add-product/core/store/add-products.reducer';
import * as fromComments from '../components/home/core/store/products.reducer';
import * as fromUserProfile from '../components/user/core/store/user.reducer';
import { AuthState } from '../components/authentication/core/types/auth.types';
import { CategoriesState } from '../components/categories/core/types/categories.types';
import { CommentState, ProductsState, ProductState } from '../components/home/core/types/home.types';
import { AddProductState } from '../components/add-product/core/types/add-products.types';

export interface AppState {
  [States.Auth]: AuthState;
  [States.Categories]: CategoriesState;
  [States.Products]: ProductsState;
  [States.Product]: ProductState;
  [States.AddProduct]: AddProductState;
  [States.Comments]: CommentState;
  [States.Profile]: AuthState;
}

export const AppReducers = {
  [States.Auth]: fromUser.authReducer,
  [States.Categories]: fromCategories.categoriesReducer,
  [States.Products]: fromProducts.productsReducer,
  [States.Product]: fromProducts.productReducer,
  [States.AddProduct]: fromAddProduct.addProductsReducer,
  [States.Comments]: fromComments.commentReducer,
  [States.Profile]: fromUserProfile.profileReducer,
};
