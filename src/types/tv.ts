export interface TvResult {
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

export interface TvListResponse {
  page: number;
  results: TvResult[];
  total_pages: number;
  total_results: number;
}

export interface TvListParams {
  language?: string;
  page?: number;
}

export interface TvAiringTodayParams extends TvListParams {
  timezone?: string;
}

export type TvOnTheAirParams = TvAiringTodayParams;
export type TvPopularParams = TvListParams;
export type TvTopRatedParams = TvListParams;
