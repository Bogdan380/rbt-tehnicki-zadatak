import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieTrailerService {
  private apiKey = 'b33e9ca01460cff061af4219488e16f7';
  private tmdbUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovieDetailsByImdbId(imdbId: string): Observable<any> {
    const url = `${this.tmdbUrl}/find/${imdbId}?api_key=${this.apiKey}&external_source=imdb_id`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.movie_results.length > 0) {
          return response.movie_results[0];
        } else {
          throw new Error('Movie not found');
        }
      })
    );
  }

  getMovieVideos(movieId: number): Observable<any> {
    const url = `${this.tmdbUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results.filter(
          (video: any) => video.type === 'Trailer'
        );
      })
    );
  }
}
