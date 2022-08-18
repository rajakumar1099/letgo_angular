export const ProductsActionTypes = {
  GetProducts: '[Products] Get Products',
  AllProducts: '[Products] All Products',
  ErrorProducts: '[Products] Error Products',
  GetProduct: '[Product] Get Product',
  ProductLoadSuccess: '[Product] Product Load Success',
  ProductLoadFailed: '[Product] Product Load Failed',
  ProductClearStore: '[Product] Product Clear From Store',
  DeleteProductSuccess: '[Delete Product] Delete Product Success',
  DeleteProductFailed: '[Delete Product] Delete Product Failed',
  DeleteProduct: '[Delete Product] Delete Product From Store',
  AddComment: '[Comment] Add Comment for product',
  GetComment: '[Comment] Get Comment for product',
  DeleteComment: '[Comment] Delete Comment for product',
  LoadCommentSuccess: '[Comment] Load Comment Success',
  LoadCommentFailed: '[Comment] Load Comment Failed',
};

export interface ProductsState {
  loading: boolean;
  error: string | null;
  products: Products[] | null;
}

export interface ProductState {
  loading: boolean;
  error: string | null;
  product: Products | null;
}

export interface CommentState {
  loading: boolean;
  error: string | null;
  data: Comment[] | null;
}

export interface Products {
  uid: string;
  product_uid: string;
  product_name: string;
  product_description: string;
  images: string[];
  product_location: string;
  product_price: string;
  product_currency: string;
  is_available: boolean;
  is_giving_away: boolean;
  product_video: string;
  category: Category;
  sellerName?: string;
  followers?: number;
  following?: number;
  items?: number;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  sub_categories: SubCategories;
}

export interface SubCategories {
  id: string;
  name: string;
  child_categories: ChildCategories;
}

export interface ChildCategories {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  fullname: string,
  product_uid: string;
  uid: string;
  comment: string;
  timestamp: number;
}
