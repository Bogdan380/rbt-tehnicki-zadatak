import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBlogPosts } from '../../../state/blog-posts/blog-posts.actions';
import {
  blogPostsSelector,
  errorSelector,
  statusSelector,
} from '../../../state/blog-posts/blog-posts.selectors';
import { AppState } from '../../../state/app.state';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from '../../../models/Movie';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss',
})
export class BlogPostsComponent implements OnInit {
  public blogPosts$ = this.store.select(blogPostsSelector);
  public loading$ = this.store.select(statusSelector);
  public error$ = this.store.select(errorSelector);

  blogPosts: Movie[] = [];

  pageSize = 5;
  currentPage = 0;
  pagedMovies: Movie[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadBlogPosts());
    this.blogPosts$.subscribe((data) => {
      this.blogPosts = data;
      this.setPagedItems();
    });
  }

  setPagedItems() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedMovies = this.blogPosts.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedItems();
  }
}
