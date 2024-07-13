import { createReducer, on } from '@ngrx/store';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
} from './categories.actions';
import { Category } from '../../models/Category';

export interface CategoriesState {
  categories: Category[];
  error: string | null;
  loading: boolean;
}

export const initialState: CategoriesState = {
  categories: [],
  error: null,
  loading: false,
};

export const categoriesReducer = createReducer(
  initialState,
  on(loadCategories, (state) => ({ ...state, loading: true })),
  on(loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    error: null,
    loading: false,
  })),
  on(loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  }))
);
