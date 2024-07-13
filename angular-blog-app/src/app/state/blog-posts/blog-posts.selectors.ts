import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BlogPostsState } from './blog-posts.reducer';

export const selectBlogPosts = (state: AppState) => state.blogPosts;
export const blogPostsSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.blogPosts
);
export const blogPostsStatusSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.loading
);

export const blogPostsErrorSelector = createSelector(
  selectBlogPosts,
  (state: BlogPostsState) => state.error
);
