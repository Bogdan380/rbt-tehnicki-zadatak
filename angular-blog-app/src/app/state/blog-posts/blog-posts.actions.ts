import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/Movie';

export const loadBlogPosts = createAction('[Movies] Load Movies');

export const loadBlogPostsSuccess = createAction(
  '[Movies] Movies Load Success',
  props<{ blogPosts: Movie[] }>()
);

export const loadBlogPostsFailure = createAction(
  '[Movies] Movies Load Failure',
  props<{ error: string }>()
);
