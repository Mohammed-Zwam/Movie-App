import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  private API = 'http://localhost:3000/api/user/watchList';

  constructor(private http: HttpClient) { }

  toggle(movieId: string) {
    return this.http.post(`${this.API}/${movieId}`, {}, { withCredentials: true });
  }

  getWatchList() {
    return this.http.get<any[]>(this.API, { withCredentials: true });
  }
}
