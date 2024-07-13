import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
} from './categories.actions';
import { BlogPostsService } from '../../services/blog-posts.service';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private blogPostsService: BlogPostsService
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.blogPostsService.getCategories().pipe(
          map((categories) =>
            loadCategoriesSuccess({ categories: categories })
          ),
          catchError((error) => of(loadCategoriesFailure({ error })))
        )
      )
    )
  );
}
