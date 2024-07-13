import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBlogPosts } from '../../../state/blog-posts/blog-posts.actions';
import {
  blogPostsSelector,
  errorSelector,
  statusSelector,
} from '../../../state/blog-posts/blog-posts.selectors';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss',
})
export class BlogPostsComponent implements OnInit {
  public blogPosts$ = this.store.select(blogPostsSelector);
  public loading$ = this.store.select(statusSelector);
  public error$ = this.store.select(errorSelector);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadBlogPosts());
  }
}
