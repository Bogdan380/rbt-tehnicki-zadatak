import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Movie } from '../models/Movie';
import { Category } from '../models/Category';

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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }
}
