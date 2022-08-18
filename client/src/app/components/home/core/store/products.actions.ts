import { createAction, props } from '@ngrx/store';
import { Products, ProductsActionTypes, Comment } from '../types/home.types';

export const GetProducts = createAction(ProductsActionTypes.GetProducts, props<{ route?: boolean }>());
export const AllProducts = createAction(
  ProductsActionTypes.AllProducts,
  props<{ products: Products[] }>()
);
export const ErrorProducts = createAction(
  ProductsActionTypes.ErrorProducts,
  props<{ error: string | null }>()
);

export const GetProduct = createAction(
  ProductsActionTypes.GetProduct,
  props<{ product_uid: string }>()
);
export const ProductLoadSuccess = createAction(
  ProductsActionTypes.ProductLoadSuccess,
  props<{ products: Products | null }>()
);
export const ProductLoadFailed = createAction(
  ProductsActionTypes.ProductLoadFailed,
  props<{ error: string | null }>()
);
export const ProductClearStore = createAction(ProductsActionTypes.ProductClearStore);
export const DeleteProduct = createAction(ProductsActionTypes.DeleteProduct , props<{ product_uid: string }>());

export const AddComments = createAction(ProductsActionTypes.AddComment,
  props<{ payload: any }>()
);
export const GetComments = createAction(ProductsActionTypes.GetComment , props<{ product_uid: string }>());
export const DeleteComments = createAction(ProductsActionTypes.DeleteComment , props<{ product_uid: string, id: string }>());
export const LoadCommentsSuccess = createAction(ProductsActionTypes.LoadCommentSuccess, props<{ data: Comment[] }>());
export const LoadCommentsFailed = createAction(ProductsActionTypes.LoadCommentFailed, props<{ error: string | null }>());
