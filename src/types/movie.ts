export interface MovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface MovieListResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
  dates?: Dates;
}

export interface MovieListParams {
  language?: string;
  page?: number;
  region?: string;
}

export type NowPlayingParams = MovieListParams;
export type PopularParams = MovieListParams;
export type TopRatedParams = MovieListParams;
export type UpcomingParams = MovieListParams;
