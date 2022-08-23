export interface Currencies {
  id: string;
  currency_name: string;
  currency_symbol: string;
}

export enum Routers {
  PRODUCTS = 'products',
  ADD_PRODUCT = 'add-product',
  USER = 'user',
  MY_LISTING = 'my-listing',
  EDIT_PROFILE = 'edit-profile',
}
