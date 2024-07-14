import { createReducer, on } from '@ngrx/store';
import {
  loadBlogPosts,
  loadBlogPostsSuccess,
  loadBlogPostsFailure,
} from './blog-posts.actions';
import { Movie } from '../../models/Movie';

export interface BlogPostsState {
  blogPosts: Movie[];
  error: string | null;
  loading: boolean;
}

export const initialState: BlogPostsState = {
  blogPosts: [],
  error: null,
  loading: false,
};

export const blogPostsReducer = createReducer(
  initialState,
  on(loadBlogPosts, (state) => ({ ...state, loading: true })),
  on(loadBlogPostsSuccess, (state, { blogPosts }) => ({
    ...state,
    blogPosts,
    error: null,
    loading: false,
  })),
  on(loadBlogPostsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
