// movie-card.ts
import { Component, Input } from '@angular/core';
import { Movie } from '../model/movie';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCard {
  @Input() movie!: Movie;
  @Input() likedMovies!: Set<string>;
  @Input() getImageUrl!: (path: string) => string;
  @Input() onToggleLike!: (movieId: string) => void;

  constructor(private router: Router) {}

  toggleLike(event: Event) {
    event.stopPropagation(); // Prevent navigation when clicking like button
    this.onToggleLike(this.movie._id!);
  }

  goToDetails() {
    this.router.navigate(['/movie', this.movie._id]);
  }
}