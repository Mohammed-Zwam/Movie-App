// movie.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

interface PaginatedMoviesResponse {
  movies: Movie[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API = 'http://localhost:3000/api/movies';

  constructor(private http: HttpClient) { }

  // GET movies with pagination support (page-based)
  getPaginated(page: number, limit: number = 18): Observable<PaginatedMoviesResponse> {
    return this.http.get<PaginatedMoviesResponse>(
      `${this.API}?page=${page}&limit=${limit}`
    );
  }

  // Optional fallback for limit/skip if needed
  getAllMovies(limit: number, skip: number): Observable<{ data: Movie[], total: number }> {
    return this.http.get<{ data: Movie[], total: number }>(
      `${this.API}?limit=${limit}&skip=${skip}`
    );
  }

  // Get a single movie by ID
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API}/${id}`);
  }

  // Get recommendations based on genre IDs
  getRecommendations(genreIds: number[]): Observable<Movie[]> {
    const genreQuery = genreIds.join(',');
    return this.http.get<Movie[]>(`${this.API}/recommendations?genres=${genreQuery}`);
  }

  search(title: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API}/search?title=${title}`);
  }
}