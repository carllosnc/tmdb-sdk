export interface FindMovieResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FindPersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for: FindMovieResult[];
  media_type: string;
}

export interface FindTvResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface FindTvEpisodeResult {
  id: number;
  name: string;
  overview: string;
  media_type: string;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  season_number: number;
  show_id: number;
}

export interface FindTvSeasonResult {
  id: number;
  name: string;
  overview: string;
  media_type: string;
  poster_path: string | null;
  season_number: number;
  air_date: string;
  vote_average: number;
  vote_count: number;
  show_id: number;
}

export interface FindByIdResponse {
  movie_results: FindMovieResult[];
  person_results: FindPersonResult[];
  tv_results: FindTvResult[];
  tv_episode_results: FindTvEpisodeResult[];
  tv_season_results: FindTvSeasonResult[];
}

export type ExternalSource =
  | "imdb_id"
  | "facebook_id"
  | "instagram_id"
  | "tvdb_id"
  | "tiktok_id"
  | "twitter_id"
  | "wikidata_id"
  | "youtube_id";

export interface FindByIdParams {
  externalSource: ExternalSource;
  includeAdult?: boolean;
  language?: string;
  page?: number;
}
