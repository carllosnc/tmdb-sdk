import type { MovieResult } from "./movie.ts";
import type { PersonKnownFor, PersonResult } from "./person.ts";

export interface SearchCollectionResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
}

export interface SearchCollectionResponse {
  page: number;
  results: SearchCollectionResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchCollectionParams {
  query: string;
  includeAdult?: boolean;
  language?: string;
  page?: number;
  region?: string;
}

export interface SearchCompanyResult {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface SearchCompanyResponse {
  page: number;
  results: SearchCompanyResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchCompanyParams {
  query: string;
  page?: number;
}

export interface SearchKeywordResult {
  id: number;
  name: string;
}

export interface SearchKeywordResponse {
  page: number;
  results: SearchKeywordResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchKeywordParams {
  query: string;
  page?: number;
}

export type SearchMovieResponse = {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export interface SearchMovieParams {
  query: string;
  includeAdult?: boolean;
  language?: string;
  primaryReleaseYear?: string;
  page?: number;
  region?: string;
  year?: string;
}

export interface SearchMultiMovieResult {
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

export interface SearchMultiTvResult {
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

export interface SearchMultiPersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for: PersonKnownFor[];
  known_for_department: string;
  media_type: "person";
  name: string;
  popularity: number;
  profile_path: string | null;
}

export type SearchMultiResult = SearchMultiMovieResult | SearchMultiTvResult | SearchMultiPersonResult;

export interface SearchMultiResponse {
  page: number;
  results: SearchMultiResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchMultiParams {
  query: string;
  includeAdult?: boolean;
  language?: string;
  page?: number;
}

export type SearchPersonResponse = {
  page: number;
  results: PersonResult[];
  total_pages: number;
  total_results: number;
};

export interface SearchPersonParams {
  query: string;
  includeAdult?: boolean;
  language?: string;
  page?: number;
}

export interface SearchTvResult {
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

export interface SearchTvResponse {
  page: number;
  results: SearchTvResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchTvParams {
  query: string;
  firstAirDateYear?: number;
  includeAdult?: boolean;
  language?: string;
  page?: number;
  year?: number;
}
