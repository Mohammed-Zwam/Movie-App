export interface Movie {
  _id?: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  genre_ids: number[];
  original_title: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
}
