import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { MovieTrailerService } from '../../../services/movie-trailer.service';
import { catchError, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.scss'],
})
export class MovieTrailerComponent implements OnChanges, OnDestroy {
  movie: any;
  trailerUrl: string | null = null;
  error: string | null = null;
  private unsubscribe$ = new Subject<void>();

  @Input() imdbId: string = '';

  constructor(private movieService: MovieTrailerService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imdbId'] && changes['imdbId'].currentValue) {
      this.fetchMovieDetails(changes['imdbId'].currentValue);
    }
  }

  fetchMovieDetails(imdbId: string) {
    this.movieService
      .getMovieDetailsByImdbId(imdbId)
      .pipe(
        switchMap((movie: any) => {
          this.movie = movie;
          return this.movieService.getMovieVideos(movie.id);
        }),
        catchError(() => {
          this.error = 'Error fetching movie details';
          return [];
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (trailers) => {
          if (trailers.length > 0) {
            this.trailerUrl = `https://www.youtube.com/watch?v=${trailers[0].key}`;
          } else {
            this.error = 'No trailer available';
          }
        },
        error: () => {
          this.error = 'Error fetching trailers';
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
