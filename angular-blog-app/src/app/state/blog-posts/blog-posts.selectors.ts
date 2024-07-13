import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BlogPostsState } from './blog-posts.reducer';

export const selectBlogPosts = (state: AppState) => state.blogPosts;
export const blogPostsSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.blogPosts
);
export const statusSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.loading
);

export const errorSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.error
);
