import type { MovieResult } from "./movie.js";
import type { PersonResult } from "./person.js";

export type TimeWindow = "day" | "week";

export interface TrendingTvResult {
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

export interface TrendingMovieResult extends MovieResult {}

export interface TrendingPersonResult extends PersonResult {}

export interface TrendingAllMovieResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: "movie";
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

export interface TrendingAllTvResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: "tv";
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

export interface TrendingAllPersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for: { adult?: boolean; backdrop_path?: string | null; genre_ids: number[]; id: number; media_type: string; original_language: string; original_title?: string; original_name?: string; overview: string; poster_path?: string | null; release_date?: string; first_air_date?: string; title?: string; name?: string; video?: boolean; vote_average: number; vote_count: number }[];
  known_for_department: string;
  media_type: "person";
  name: string;
  popularity: number;
  profile_path: string | null;
}

export type TrendingAllResult = TrendingAllMovieResult | TrendingAllTvResult | TrendingAllPersonResult;

export interface TrendingAllResponse {
  page: number;
  results: TrendingAllResult[];
  total_pages: number;
  total_results: number;
}

export interface TrendingMoviesResponse {
  page: number;
  results: TrendingMovieResult[];
  total_pages: number;
  total_results: number;
}

export interface TrendingPeopleResponse {
  page: number;
  results: TrendingPersonResult[];
  total_pages: number;
  total_results: number;
}

export interface TrendingTvResponse {
  page: number;
  results: TrendingTvResult[];
  total_pages: number;
  total_results: number;
}

export interface TrendingParams {
  includeAdult?: boolean;
  language?: string;
  page?: number;
  timeWindow?: TimeWindow;
}
