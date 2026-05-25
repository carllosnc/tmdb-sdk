export interface CreditMediaSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  show_id: number;
}

export interface CreditMedia {
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
  character?: string;
  episodes?: unknown[];
  seasons?: CreditMediaSeason[];
}

export interface CreditPerson {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string | null;
}

export interface CreditDetails {
  credit_type: string;
  department: string;
  job: string;
  media: CreditMedia;
  media_type: string;
  id: string;
  person: CreditPerson;
}
