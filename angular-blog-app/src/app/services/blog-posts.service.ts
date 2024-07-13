import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private getUrl = `${environment.dev.apiUrl}/movies`;
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.getUrl);
  }
}
