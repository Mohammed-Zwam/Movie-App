import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { WatchListService } from '../services/watchList.service';
import { Search } from '../search/search';
import { MovieList } from '../movie-list/movie-list';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Search, MovieList, Loading],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  movies: Movie[] = [];
  likedMovies: Set<string> = new Set();
  isLoading: boolean = true;
  currentPage = 1;
  totalPages = 1;
  limit = 8;
  skip = 0;
  pageWindowStart = 1;
  pageWindowSize = 6; // how many page buttons to show



  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private watchListService: WatchListService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }
  loadMovies(): void {
    this.movieService.getAllMovies(this.limit, this.skip).subscribe({
      next: (res) => {
        this.movies = res.data;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        const total = res.total || res.data.length;
        this.totalPages = Math.ceil(total / this.limit);

        // WatchList check if logged in
        if (this.authService.isLoggedIn) {
          this.watchListService.getWatchList().subscribe({
            next: (list) => {
              this.likedMovies = new Set(list.map((m) => m._id));
            },
            error: (err) => console.error('WatchList load error:', err),
          });
        }
      },
      error: (err) => console.error('Movies load error:', err),
    });
  }


  onSearch(searchText: string) {
    this.movieService.search(searchText).subscribe({
      next: (res) => {
        this.movies = res;
      },
      error: (err) => console.error('Search error:', err),
    });
  }

  onLike(movieId: number) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/watchList']);
    }
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  onToggleLike(movieId: string) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.watchListService.toggle(movieId).subscribe({
      next: () => {
        if (this.likedMovies.has(movieId)) {
          this.likedMovies.delete(movieId);
        } else {
          this.likedMovies.add(movieId);
        }
      },
      error: (err) => console.error('Toggle like failed:', err)
    });
  }


  nextPages() {
    if (this.pageWindowStart + this.pageWindowSize <= this.totalPages) {
      this.pageWindowStart += this.pageWindowSize;
    }
  }

  prevPages() {
    if (this.pageWindowStart > 1) {
      this.pageWindowStart -= this.pageWindowSize;
    }
  }


  goToPage(page: number) {
    this.currentPage = page;
    this.skip = (page - 1) * this.limit;
    this.loadMovies();

    if (page >= this.pageWindowStart + this.pageWindowSize) {
      this.pageWindowStart = page;
    }
  }


  getPageNumbers(): number[] {
    const pages = [];
    const end = Math.min(this.pageWindowStart + this.pageWindowSize - 1, this.totalPages);

    for (let i = this.pageWindowStart; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
