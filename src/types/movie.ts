export interface MovieResult {
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

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface MovieListResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
  dates?: Dates;
}

export interface MovieListParams {
  language?: string;
  page?: number;
  region?: string;
}

export type NowPlayingParams = MovieListParams;
export type PopularParams = MovieListParams;
export type TopRatedParams = MovieListParams;
export type UpcomingParams = MovieListParams;

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

import type { Genre } from "./genre.js";

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieAppendToResponseValue =
  | "account_states"
  | "alternative_titles"
  | "changes"
  | "credits"
  | "external_ids"
  | "images"
  | "keywords"
  | "lists"
  | "recommendations"
  | "release_dates"
  | "reviews"
  | "similar"
  | "translations"
  | "videos"
  | "watch/providers";

export interface MovieAppendToResponseMap {
  account_states: MovieAccountStates;
  alternative_titles: MovieAlternativeTitlesResponse;
  changes: MovieChangesResponse;
  credits: MovieCreditsResponse;
  external_ids: MovieExternalIdsResponse;
  images: MovieImagesResponse;
  keywords: MovieKeywordsResponse;
  lists: MovieListsResponse;
  recommendations: MovieListResponse;
  release_dates: MovieReleaseDatesResponse;
  reviews: MovieReviewsResponse;
  similar: MovieListResponse;
  translations: MovieTranslationsResponse;
  videos: MovieVideosResponse;
  "watch/providers": MovieWatchProvidersResponse;
}

export type WithMovieAppendToResponse<T extends readonly MovieAppendToResponseValue[]> =
  MovieDetails & {
    [K in T[number]]: MovieAppendToResponseMap[K];
  };

export interface MovieDetailsParams {
  append_to_response?: MovieAppendToResponseValue[];
  language?: string;
}

export type MovieAppendToResponseResult<T> =
  [T] extends [readonly MovieAppendToResponseValue[]]
    ? MovieDetails & { [K in T[number]]: MovieAppendToResponseMap[K] }
    : MovieDetails;

export interface MovieAccountStates {
  id: number;
  favorite: boolean;
  rated: { value: number } | null;
  watchlist: boolean;
}

export interface MovieAccountStatesParams {
  session_id?: string;
  guest_session_id?: string;
}

export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface MovieAlternativeTitlesResponse {
  id: number;
  titles: AlternativeTitle[];
}

export interface MovieAlternativeTitlesParams {
  country?: string;
}

export interface MovieChangeItem {
  id: string;
  action: string;
  time: string;
  iso_639_1: string;
  iso_3166_1: string;
  value: Record<string, unknown>;
}

export interface MovieChangeGroup {
  key: string;
  items: MovieChangeItem[];
}

export interface MovieChangesResponse {
  changes: MovieChangeGroup[];
}

export interface MovieChangesParams {
  end_date?: string;
  page?: number;
  start_date?: string;
}

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MovieCreditsParams {
  language?: string;
}

export interface MovieExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface ImageData {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieImagesResponse {
  backdrops: ImageData[];
  id: number;
  logos: ImageData[];
  posters: ImageData[];
}

export interface MovieImagesParams {
  include_image_language?: string;
  language?: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface MovieKeywordsResponse {
  id: number;
  keywords: Keyword[];
}

export interface MovieListEntry {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface MovieListsResponse {
  id: number;
  page: number;
  results: MovieListEntry[];
  total_pages: number;
  total_results: number;
}

export interface MovieListsParams {
  language?: string;
  page?: number;
}

export interface MovieRecommendationsParams {
  language?: string;
  page?: number;
}

export interface ReleaseDateInfo {
  certification: string;
  descriptors: unknown[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateCountry {
  iso_3166_1: string;
  release_dates: ReleaseDateInfo[];
}

export interface MovieReleaseDatesResponse {
  id: number;
  results: ReleaseDateCountry[];
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface MovieReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface MovieReviewsParams {
  language?: string;
  page?: number;
}

export interface MovieSimilarParams {
  language?: string;
  page?: number;
}

export interface TranslationData {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface Translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationData;
}

export interface MovieTranslationsResponse {
  id: number;
  translations: Translation[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieVideosResponse {
  id: number;
  results: Video[];
}

export interface MovieVideosParams {
  language?: string;
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface MovieWatchProvidersResponse {
  id: number;
  results: Record<string, CountryWatchProviders>;
}

export interface AddRatingRequest {
  value: number;
}

export interface AddRatingParams {
  session_id?: string;
  guest_session_id?: string;
}

export interface DeleteRatingParams {
  session_id?: string;
  guest_session_id?: string;
}
