import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CategoriesState } from './categories.reducer';

export const selectCategories = (state: AppState) => state.categories;
export const categoriesSelector = createSelector(
  selectCategories,
  (state: CategoriesState) => state.categories
);
export const categoriesStatusSelector = createSelector(
  selectCategories,
  (state: CategoriesState) => state.loading
);

export const categoriesErrorSelector = createSelector(
  selectCategories,
  (state: CategoriesState) => state.error
);
