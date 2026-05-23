export interface AccountAvatar {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string | null;
  };
}

export interface AccountDetails {
  avatar: AccountAvatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface GetAccountDetailsParams {
  sessionId?: string;
  accountId?: number;
}

export interface AddFavoriteRequest {
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
}

export interface AddFavoriteParams {
  accountId: number;
  sessionId?: string;
}

export interface TMDBResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface AddWatchlistRequest {
  media_type: "movie" | "tv";
  media_id: number;
  watchlist: boolean;
}

export interface AddWatchlistParams {
  accountId: number;
  sessionId?: string;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface FavoriteMovie {
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

export interface FavoriteTV {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface GetFavoritesParams {
  accountId: number;
  sessionId?: string;
  language?: string;
  page?: number;
  sortBy?: "created_at.asc" | "created_at.desc";
}

export interface AccountList {
  description: string;
  favorite_count: number;
  id: number;
  iso_639_1: string;
  item_count: number;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface GetListsParams {
  accountId: number;
  sessionId?: string;
  page?: number;
}

export interface RatedMovie extends FavoriteMovie {
  rating: number;
}

export interface RatedTV extends FavoriteTV {
  rating: number;
}

export type GetRatedParams = GetFavoritesParams;

export type GetWatchlistParams = GetFavoritesParams;

export interface RatedEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  rating: number;
}
