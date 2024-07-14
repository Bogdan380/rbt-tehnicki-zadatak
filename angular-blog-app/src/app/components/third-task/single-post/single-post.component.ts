import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../models/Movie';
import { BlogPostsService } from '../../../services/blog-posts.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import {
  addComment,
  loadComments,
} from '../../../state/comments/comments.actions';
import {
  commentsErrorSelector,
  commentsSelector,
  commentsStatusSelector,
} from '../../../state/comments/comments.selectors';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent {
  movie: Movie = {} as Movie;
  public comments$ = this.store.select(commentsSelector);
  public error$ = this.store.select(commentsErrorSelector);
  public loading$ = this.store.select(commentsStatusSelector);

  newCommentText: string = '';
  showError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private blogPostsService: BlogPostsService,
    private store: Store<AppState>,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getMovie();
  }

  getMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadComments({ movieId: id }));
    this.blogPostsService.getMovie(id).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  addComment() {
    if (this.newCommentText.trim()) {
      this.store.dispatch(
        addComment({ movieId: this.movie.id, comment: this.newCommentText })
      );
      this.newCommentText = '';
    }
  }

  showErrorMessage() {
    if (!this.newCommentText) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }
}
