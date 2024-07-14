import { BlogPostsState } from './blog-posts/blog-posts.reducer';
import { CategoriesState } from './categories/categories.reducer';
import { CommentsState } from './comments/comments.reducer';

export interface AppState {
  blogPosts: BlogPostsState;
  categories: CategoriesState;
  comments: CommentsState;
}
