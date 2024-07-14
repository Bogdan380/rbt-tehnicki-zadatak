import { createAction, props } from '@ngrx/store';
import { Comment } from '../../models/Comment';

export const loadComments = createAction(
  '[Comments] Load Comments',
  props<{ movieId: number }>()
);

export const loadCommentsSuccess = createAction(
  '[Comments] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Comments] Load Comments Failure',
  props<{ error: string }>()
);

export const addComment = createAction(
  '[Comments] Add Comment',
  props<{ movieId: number; comment: string }>()
);

export const addCommentSuccess = createAction(
  '[Comments] Add Comment Success',
  props<{ comment: Comment }>()
);

export const addCommentFailure = createAction(
  '[Comments] Add Comment Failure',
  props<{ error: string }>()
);
