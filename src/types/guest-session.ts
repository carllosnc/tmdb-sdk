import type { PaginatedResponse } from "./account.ts";

export interface GuestSessionRatedMovie {
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
  rating: number;
}

export interface GuestSessionRatedTv {
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
  rating: number;
}

export interface GuestSessionRatedTvEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  rating: number;
}

export interface GuestSessionRatedMoviesParams {
  language?: string;
  page?: number;
  sortBy?: "created_at.asc" | "created_at.desc";
}

export interface GuestSessionRatedTvParams {
  language?: string;
  page?: number;
  sortBy?: "created_at.asc" | "created_at.desc";
}

export interface GuestSessionRatedTvEpisodesParams {
  language?: string;
  page?: number;
  sortBy?: "created_at.asc" | "created_at.desc";
}

export type GuestSessionRatedMoviesResponse =
  PaginatedResponse<GuestSessionRatedMovie>;
export type GuestSessionRatedTvResponse =
  PaginatedResponse<GuestSessionRatedTv>;
export type GuestSessionRatedTvEpisodesResponse =
  PaginatedResponse<GuestSessionRatedTvEpisode>;
