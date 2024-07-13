import { BlogPostsState } from './blog-posts/blog-posts.reducer';
import { CategoriesState } from './categories/categories.reducer';

export interface AppState {
  blogPosts: BlogPostsState;
  categories: CategoriesState;
}
