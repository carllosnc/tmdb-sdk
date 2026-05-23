export interface KeywordDetails {
  id: number;
  name: string;
}

export interface KeywordMovieResult {
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

export interface KeywordMoviesResponse {
  id: number;
  page: number;
  results: KeywordMovieResult[];
  total_pages: number;
  total_results: number;
}

export interface KeywordMoviesParams {
  includeAdult?: boolean;
  language?: string;
  page?: number;
}
