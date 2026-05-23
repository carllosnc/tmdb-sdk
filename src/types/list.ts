import { type TMDBResponse } from "./account.js";

export interface ListDetailsParams {
  listId: number;
  language?: string;
  page?: number;
}

export interface ListItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: string;
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

export interface ListDetails {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: ListItem[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string | null;
}

export interface CreateListRequest {
  name: string;
  description: string;
  language: string;
}

export interface CreateListParams {
  sessionId: string;
}

export interface CreateListResponse extends TMDBResponse {
  list_id: number;
}

export interface AddMovieParams {
  listId: number;
  sessionId: string;
}

export interface AddMovieRequest {
  media_id: number;
}

export interface RemoveMovieParams {
  listId: number;
  sessionId: string;
}

export interface RemoveMovieRequest {
  media_id: number;
}

export interface CheckItemStatusParams {
  listId: number;
  language?: string;
  movieId?: number;
}

export interface CheckItemStatusResponse {
  id: number;
  item_present: boolean;
}

export interface ClearListParams {
  listId: number;
  sessionId: string;
  confirm: boolean;
}

export interface DeleteListParams {
  listId: number;
  sessionId: string;
}

export type ListStatusResponse = TMDBResponse;
