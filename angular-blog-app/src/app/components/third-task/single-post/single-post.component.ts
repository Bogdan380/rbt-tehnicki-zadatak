import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../models/Movie';
import { BlogPostsService } from '../../../services/blog-posts.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { loadComments } from '../../../state/comments/comments.actions';
import {
  commentsErrorSelector,
  commentsSelector,
  commentsStatusSelector,
} from '../../../state/comments/comments.selectors';

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

  constructor(
    private route: ActivatedRoute,
    private blogPostsService: BlogPostsService,
    private location: Location,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadComments({ movieId: id }));
    this.blogPostsService.getMovie(id).subscribe((movie: Movie) => {
      this.movie = movie;
    });
  }

  addComment() {
    if (this.newCommentText.trim()) {
      // this.store.dispatch(addComment({ text: this.newCommentText }));
      // this.newCommentText = '';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
