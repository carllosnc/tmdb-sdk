export type V4SortBy = "created_at.asc" | "created_at.desc";

export interface V4PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface V4ListResult {
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  item_count: number;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export type V4AccountListsResponse = V4PaginatedResponse<V4ListResult>;

export interface V4AccountListsParams {
  page?: number;
}

export interface V4MovieResult {
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

export interface V4TvResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export type V4AccountFavoriteMoviesResponse = V4PaginatedResponse<V4MovieResult>;
export type V4AccountFavoriteTvShowsResponse = V4PaginatedResponse<V4TvResult>;
export type V4AccountRatedMoviesResponse = V4PaginatedResponse<V4MovieResult>;
export type V4AccountRatedTvShowsResponse = V4PaginatedResponse<V4TvResult>;
export type V4AccountWatchlistMoviesResponse = V4PaginatedResponse<V4MovieResult>;
export type V4AccountWatchlistTvShowsResponse = V4PaginatedResponse<V4TvResult>;

export interface V4AccountMediaParams {
  language?: string;
  page?: number;
  sortBy?: V4SortBy;
}
