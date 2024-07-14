import { createReducer, on } from '@ngrx/store';
import {
  loadComments,
  loadCommentsSuccess,
  loadCommentsFailure,
  addComment,
  addCommentSuccess,
  addCommentFailure,
} from './comments.actions';
import { Comment } from '../../models/Comment';

export interface CommentsState {
  comments: Comment[];
  error: string | null;
  loading: boolean;
}

export const initialState: CommentsState = {
  comments: [],
  error: null,
  loading: false,
};

export const commentsReducer = createReducer(
  initialState,
  on(loadComments, (state) => ({ ...state, loading: true })),
  on(loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
    error: null,
    loading: false,
  })),
  on(loadCommentsFailure, (state, { error }) => ({
    ...state,
    comments: [],
    error,
    loading: false,
  })),
  on(addComment, (state) => ({ ...state, loading: true })),
  on(addCommentSuccess, (state, { comment }) => ({
    ...state,
    comments: [...state.comments, comment],
    error: null,
    loading: false,
  })),
  on(addCommentFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
