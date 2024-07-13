import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/Category';

export const loadCategories = createAction('[Categories] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Categories] Categories Load Success',
  props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Categories] Categories Load Failure',
  props<{ error: string }>()
);
