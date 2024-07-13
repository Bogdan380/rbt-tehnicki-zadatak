import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadBlogPosts,
  loadBlogPostsSuccess,
  loadBlogPostsFailure,
} from './blog-posts.actions';
import { BlogPostsService } from '../../services/blog-posts.service';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class BlogPostsEffects {
  constructor(
    private actions$: Actions,
    private blogPostsService: BlogPostsService
  ) {}

  loadBlogPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBlogPosts),
      mergeMap(() =>
        this.blogPostsService.getMovies().pipe(
          map((movies) => loadBlogPostsSuccess({ blogPosts: movies })),
          catchError((error) => of(loadBlogPostsFailure({ error })))
        )
      )
    )
  );
}
