export interface PersonKnownFor {
  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for: PersonKnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
}

export interface PopularPersonResponse {
  page: number;
  results: PersonResult[];
  total_pages: number;
  total_results: number;
}

export interface PopularPersonParams {
  language?: string;
  page?: number;
}
