export enum ADDPRODUCT {
  CATEGORY = 'category',
  SUB_CATEGORY = 'sub_category',
  CHILD_CATEGORY = 'child_category',
  PRODUCT_TITLE = 'productTitle',
  PRODUCT_DESCRIPTION = 'productDescription',
  PRODUCT_LOCATION = 'productLocation',
  PRODUCT_PRICE = 'productPrice',
  CURRENCY = 'currency',
  IS_GIVING_AWAY = 'givingAway',
  PRODUCT_IMAGES = 'productImages',
  PRODUCT_VIDEO = 'productVideo',
}

export const AddProductActionTypes = {
  AddProductRequest: '[Add-Product] Add Product Request',
  AddProductSuccess: '[Add-Product] Add Products Success',
  ErrorProductFailure: '[Add-Product] Add Product Error',
};

export interface AddProductState {
  loading: boolean;
  error: string | null;
  addProduct: AddProduct | null;
}

export interface AddProduct {
  uid: string;
  product_uid: string;
  product_name: string;
  product_description: string;
  // images: string;
  product_location: string;
  product_price: string;
  product_currency: string;
  is_available: boolean;
  product_video: string;
  category: string;
  sub_category: string;
  child_category: string
}


