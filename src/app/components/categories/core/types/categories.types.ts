export const CategoriesActionTypes = {
  GetCategories: '[Categories] Get Categories',
  AllCategories: '[Categories] All Categories',
  ErrorCategories: '[Categories] Error Categories',
};

export interface CategoriesState {
  loading: boolean;
  error: string | null;
  categories: Categories[] | null;
}

export interface Categories {
  id: string;
  name: string;
  image: string;
  sub_categories: SubCategories[];
}

export interface SubCategories {
  id: string;
  name: string;
  child_categories: ChildCategories[];
}

export interface ChildCategories {
  id: string;
  name: string;
}
