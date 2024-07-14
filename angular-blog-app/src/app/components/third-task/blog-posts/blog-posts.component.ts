import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBlogPosts } from '../../../state/blog-posts/blog-posts.actions';
import {
  blogPostsErrorSelector,
  blogPostsSelector,
  blogPostsStatusSelector,
} from '../../../state/blog-posts/blog-posts.selectors';
import { AppState } from '../../../state/app.state';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from '../../../models/Movie';
import { loadCategories } from '../../../state/categories/categories.actions';
import { categoriesSelector } from '../../../state/categories/categories.selectors';
import { Category } from '../../../models/Category';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
})
export class BlogPostsComponent implements OnInit, OnDestroy {
  public blogPosts$ = this.store.select(blogPostsSelector);
  public categories$ = this.store.select(categoriesSelector);
  public loading$ = this.store.select(blogPostsStatusSelector);
  public error$ = this.store.select(blogPostsErrorSelector);
  private destroy$ = new Subject<void>();

  blogPosts: Movie[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | 'all' = 'all';

  pageSize = 5;
  currentPage = 0;
  pagedMovies: Movie[] = [];
  filteredItems: Movie[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    const redirectAfterLogout = sessionStorage.getItem('redirectAfterLogout');
    if (redirectAfterLogout) {
      this.router.navigateByUrl(redirectAfterLogout);
      sessionStorage.removeItem('redirectAfterLogout');
    }

    this.store.dispatch(loadCategories());
    this.store.dispatch(loadBlogPosts());
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.categories = [{ id: 0, name: 'All' }, ...data];
    });
    this.blogPosts$.subscribe((data) => {
      this.blogPosts = data;
      this.filterItems();
    });
  }

  filterItems() {
    if (this.selectedCategoryId === 'all') {
      this.filteredItems = this.blogPosts;
    } else {
      this.filteredItems = this.blogPosts.filter(
        (blogPost) => blogPost.categoryId === this.selectedCategoryId
      );
    }
    this.setPagedItems();
  }

  setPagedItems() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedMovies = this.filteredItems.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.setPagedItems();
  }

  handleCategoryChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedCategoryId =
      Number(selectedId) === 0 ? 'all' : Number(selectedId);
    this.currentPage = 0;
    this.filterItems();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
