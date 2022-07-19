export const ProductsActionTypes = {
  GetProducts: '[Products] Get Products',
  AllProducts: '[Products] All Products',
  ErrorProducts: '[Products] Error Products',
};

export interface ProductState {
  loading: boolean;
  error: string | null;
  products: Products[] | null;
}

export interface Products {
  uid: string;
  product_uid: string;
  product_name: string;
  product_description: string;
  images: File[];
  product_location: string;
  product_price: string;
  product_currency: string;
  is_available: boolean;
  is_giving_away: boolean;
  product_video: string;
  category: Category;
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
