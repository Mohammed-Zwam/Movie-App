import { Component, OnInit } from '@angular/core';
import { WatchListService } from '../services/watchList.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-watchList',
  standalone: true,
  templateUrl: './watchList.html',
  styleUrls: ['./watchList.css'],
  imports: [CommonModule, Loading]
})
export class WatchList implements OnInit {
  watchList: any[] = [];
  isLoading: boolean = true;

  constructor(private watchListService: WatchListService, public authService: AuthService) { }

  ngOnInit(): void {
    this.watchListService.getWatchList().subscribe({
      next: (data) => {
        this.watchList = data
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }
  removeFromWatchList(movieId: string) {
    this.watchListService.toggle(movieId).subscribe(() => {
      this.watchList = this.watchList.filter(m => m._id !== movieId);
    });
  }
}
