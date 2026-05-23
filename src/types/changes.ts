export interface ChangedMovie {
  id: number;
  adult: boolean | null;
}

export interface ChangedMoviesResponse {
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

export interface ChangedPeopleResponse {
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
