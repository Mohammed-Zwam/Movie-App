import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { WatchListService } from '../services/watchList.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetails implements OnInit {
  movie: Movie | null = null;
  recommendations: Movie[] = [];
  isLoading = true;
  error: string | null = null;
  isLiked = false;
  showFullOverview = false;
  overviewWordLimit = 30;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private authService: AuthService,
    private watchListService: WatchListService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(movieId);
      this.checkIfLiked(movieId);
    }
  }

  loadMovieDetails(id: string): void {
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
        this.loadRecommendations(); 
      },
      error: (err) => {
        console.error('Error loading movie details:', err);
        this.error = 'Failed to load movie details';
        this.isLoading = false;
      }
    });
  }

  checkIfLiked(movieId: string): void {
    if (this.authService.isLoggedIn) {
      this.watchListService.getWatchList().subscribe({
        next: (list) => {
          this.isLiked = list.some(m => m._id === movieId);
        },
        error: (err) => console.error('Error checking watchlist:', err)
      });
    }
  }

  loadRecommendations(): void {
    if (this.movie) {
      this.movieService.getRecommendations(this.movie.genre_ids).subscribe({
        next: (movies) => {
          this.recommendations = movies
            .filter(m => m._id !== this.movie?._id)
            .slice(0, 5);
        },
        error: (err) => console.error('Error loading recommendations:', err)
      });
    }
  }

  toggleLike(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.movie?._id) {
      this.watchListService.toggle(this.movie._id).subscribe({
        next: () => {
          this.isLiked = !this.isLiked;
        },
        error: (err) => console.error('Toggle like failed:', err)
      });
    }
  }

  getImageUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
  }

  getBackdropUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/original${path}` : '';
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getGenreNames(genreIds: number[]): string {
    const genreMap: { [key: number]: string } = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
      99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
      27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
      10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    
    return genreIds.map(id => genreMap[id] || 'Unknown').join(', ');
  }

  getTruncatedOverview(overview: string): string {
    const words = overview.split(' ');
    if (words.length <= this.overviewWordLimit) {
      return overview;
    }
    return words.slice(0, this.overviewWordLimit).join(' ') + '...';
  }

  toggleOverview(): void {
    this.showFullOverview = !this.showFullOverview;
  }

  onRecommendationClick(movie: Movie): void {
    this.router.navigate(['/movie', movie._id]).then(() => {
      const movieId = movie._id;
      if (movieId) {
        this.isLoading = true;
        this.movie = null;
        this.recommendations = [];
        this.showFullOverview = false;
        this.loadMovieDetails(movieId);
        this.checkIfLiked(movieId);
        window.scrollTo(0, 0);
      }
    });
  }
}