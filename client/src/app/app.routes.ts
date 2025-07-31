// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { WatchList } from './watchList/watchList';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { MovieDetails } from './movie-details/movie-details.component';


export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'movie/:id', 
    component: MovieDetails
  },
  {
    path: 'watchList',
    component: WatchList
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'signup',
    component: Signup
  }
];