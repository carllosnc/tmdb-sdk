import type { V4MovieResult, V4PaginatedResponse, V4TvResult } from "./account-v4.js";

export type V4MediaType = "movie" | "tv";

export interface V4ListItem {
  comment: string;
  media_type: V4MediaType;
  media_id: number;
  original_title?: string;
  original_name?: string;
  title?: string;
  name?: string;
  overview?: string;
  popularity?: number;
  backdrop_path?: string | null;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
  adult?: boolean;
}

export interface V4ListDetails {
  id: number;
  name: string;
  description: string;
  public: boolean;
  revenue: string;
  runtime: string;
  sort_by: number;
  iso_639_1: string;
  iso_3166_1: string;
  average_vote: number;
  vote_count: number;
  backdrop_path: string | null;
  poster_path: string | null;
  results: V4ListItem[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface V4ListDetailsParams {
  language?: string;
  page?: number;
  sortBy?: string;
}

export interface V4CreateListRequest {
  name: string;
  description?: string;
  iso_639_1: string;
  iso_3166_1?: string;
  public?: boolean;
}

export interface V4CreateListResponse {
  id: number;
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface V4UpdateListRequest {
  name?: string;
  description?: string;
  public?: boolean;
  sort_by?: string;
}

export interface V4ListActionResponse {
  status_code: number;
  status_message: string;
  results: Array<{ media_type: V4MediaType; media_id: number; success: boolean }>;
}

export interface V4ListItemInput {
  media_type: V4MediaType;
  media_id: number;
}

export interface V4UpdateListItemInput extends V4ListItemInput {
  comment?: string;
}

export interface V4AddItemsRequest {
  items: V4ListItemInput[];
}

export interface V4UpdateItemsRequest {
  items: V4UpdateListItemInput[];
}

export interface V4RemoveItemsRequest {
  items: V4ListItemInput[];
}

export interface V4ItemStatusParams {
  media_id: number;
  media_type: V4MediaType;
}

export interface V4ItemStatusResponse {
  id: number;
  item_present: boolean;
  status_code: number;
  status_message: string;
}

export interface V4ClearListResponse {
  status_code: number;
  status_message: string;
}

export interface V4DeleteListResponse {
  status_code: number;
  status_message: string;
}

export type V4ListResultsResponse = V4PaginatedResponse<V4MovieResult | V4TvResult>;
