import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { Category } from '../models/Category';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private moviesUrl = `${environment.dev.apiUrl}/movies`;
  private categoriesUrl = `${environment.dev.apiUrl}/categories`;
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.moviesUrl}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.moviesUrl}/${id}/comments`);
  }
}
