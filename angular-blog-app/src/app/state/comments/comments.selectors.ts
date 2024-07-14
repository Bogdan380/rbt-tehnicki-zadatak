import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommentsState } from './comments.reducer';

export const selectComments = (state: AppState) => state.comments;
export const commentsSelector = createSelector(
  selectComments,
  (state: CommentsState) => state.comments
);
export const commentsStatusSelector = createSelector(
  selectComments,
  (state: CommentsState) => state.loading
);

export const commentsErrorSelector = createSelector(
  selectComments,
  (state: CommentsState) => state.error
);
