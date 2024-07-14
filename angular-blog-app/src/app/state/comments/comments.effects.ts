import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadComments,
  loadCommentsSuccess,
  loadCommentsFailure,
} from './comments.actions';
import { BlogPostsService } from '../../services/blog-posts.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private blogPostsService: BlogPostsService
  ) {}

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadComments),
      mergeMap(({ movieId }) =>
        this.blogPostsService.getComments(movieId).pipe(
          map((comments) => loadCommentsSuccess({ comments })),
          catchError((error) => of(loadCommentsFailure({ error })))
        )
      )
    )
  );
}
