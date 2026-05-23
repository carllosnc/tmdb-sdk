export interface ChangedMovie {
  id: number;
  adult: boolean | null;
}

export interface MovieChangesResponse {
  results: ChangedMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface GetMovieChangesParams {
  startDate?: string;
  endDate?: string;
  page?: number;
}

export interface ChangedPerson {
  id: number;
  adult: boolean | null;
}

export interface PersonChangesResponse {
  results: ChangedPerson[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type GetPersonChangesParams = GetMovieChangesParams;

export interface ChangedTV {
  id: number;
  adult: boolean | null;
}

export interface TVChangesResponse {
  results: ChangedTV[];
  page: number;
  total_pages: number;
  total_results: number;
}

export type GetTVChangesParams = GetMovieChangesParams;
