export interface DiscoverMovieResult {
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

export interface DiscoverMovieResponse {
  page: number;
  results: DiscoverMovieResult[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverMoviesParams {
  certification?: string;
  certificationGte?: string;
  certificationLte?: string;
  certificationCountry?: string;
  includeAdult?: boolean;
  includeVideo?: boolean;
  language?: string;
  page?: number;
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  region?: string;
  releaseDateGte?: string;
  releaseDateLte?: string;
  sortBy?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  watchRegion?: string;
  withCast?: string;
  withCompanies?: string;
  withCrew?: string;
  withGenres?: string;
  withKeywords?: string;
  withOriginCountry?: string;
  withOriginalLanguage?: string;
  withPeople?: string;
  withReleaseType?: number;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withWatchMonetizationTypes?: string;
  withWatchProviders?: string;
  withoutCompanies?: string;
  withoutGenres?: string;
  withoutKeywords?: string;
  withoutWatchProviders?: string;
  year?: number;
}

export interface DiscoverTvResult {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface DiscoverTvResponse {
  page: number;
  results: DiscoverTvResult[];
  total_pages: number;
  total_results: number;
}

export interface DiscoverTvParams {
  airDateGte?: string;
  airDateLte?: string;
  firstAirDateYear?: number;
  firstAirDateGte?: string;
  firstAirDateLte?: string;
  includeAdult?: boolean;
  includeNullFirstAirDates?: boolean;
  language?: string;
  page?: number;
  screenedTheatrically?: boolean;
  sortBy?: string;
  timezone?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  voteCountLte?: number;
  watchRegion?: string;
  withCompanies?: string;
  withGenres?: string;
  withKeywords?: string;
  withNetworks?: number;
  withOriginCountry?: string;
  withOriginalLanguage?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withStatus?: string;
  withWatchMonetizationTypes?: string;
  withWatchProviders?: string;
  withoutCompanies?: string;
  withoutGenres?: string;
  withoutKeywords?: string;
  withoutWatchProviders?: string;
  withType?: string;
}
