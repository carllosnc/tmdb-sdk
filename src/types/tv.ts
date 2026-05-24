import type {
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
  ImageData,
  Video,
  CastMember,
  CrewMember,
  Review,
  Keyword,
  CountryWatchProviders,
} from "./movie.js";
import type { Genre } from "./genre.js";

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

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string | null;
  episode_number: number;
  production_code: string | null;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface TvSeriesDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir | null;
  name: string;
  next_episode_to_air: LastEpisodeToAir | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export type TvAppendToResponseValue =
  | "account_states"
  | "aggregate_credits"
  | "alternative_titles"
  | "changes"
  | "content_ratings"
  | "credits"
  | "episode_groups"
  | "external_ids"
  | "images"
  | "keywords"
  | "lists"
  | "recommendations"
  | "reviews"
  | "screened_theatrically"
  | "similar"
  | "translations"
  | "videos"
  | "watch/providers";

export interface TvAppendToResponseMap {
  account_states: TvSeriesAccountStates;
  aggregate_credits: TvAggregateCreditsResponse;
  alternative_titles: TvSeriesAlternativeTitlesResponse;
  changes: TvSeriesChangesResponse;
  content_ratings: TvContentRatingsResponse;
  credits: TvCreditsResponse;
  episode_groups: TvEpisodeGroupsResponse;
  external_ids: TvSeriesExternalIdsResponse;
  images: TvSeriesImagesResponse;
  keywords: TvSeriesKeywordsResponse;
  lists: TvSeriesListsResponse;
  recommendations: TvListResponse;
  reviews: TvSeriesReviewsResponse;
  screened_theatrically: TvScreenedTheatricallyResponse;
  similar: TvListResponse;
  translations: TvSeriesTranslationsResponse;
  videos: TvSeriesVideosResponse;
  "watch/providers": TvSeriesWatchProvidersResponse;
}

export type WithTvAppendToResponse<T extends TvAppendToResponseValue[]> =
  TvSeriesDetails & {
    [K in T[number]]: TvAppendToResponseMap[K];
  };

export interface TvSeriesDetailsParams {
  append_to_response?: TvAppendToResponseValue[];
  language?: string;
}

export interface TvSeriesAccountStates {
  id: number;
  favorite: boolean;
  rated: { value: number } | null;
  watchlist: boolean;
}

export interface TvSeriesAccountStatesParams {
  session_id?: string;
  guest_session_id?: string;
}

export interface AggregateRole {
  credit_id: string;
  character: string;
  episode_count: number;
}

export interface AggregateCastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  roles: AggregateRole[];
  total_episode_count: number;
  order: number;
}

export interface AggregateJob {
  credit_id: string;
  job: string;
  episode_count: number;
}

export interface AggregateCrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  jobs: AggregateJob[];
  department: string;
  total_episode_count: number;
}

export interface TvAggregateCreditsResponse {
  cast: AggregateCastMember[];
  crew: AggregateCrewMember[];
  id: number;
}

export interface TvAggregateCreditsParams {
  language?: string;
}

export interface TvAlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TvSeriesAlternativeTitlesResponse {
  id: number;
  results: TvAlternativeTitle[];
}

export interface TvSeriesAlternativeTitlesParams {
  country?: string;
}

export interface TvChangeItem {
  id: string;
  action: string;
  time: string;
  iso_639_1: string;
  iso_3166_1: string;
  value: Record<string, unknown>;
}

export interface TvChangeGroup {
  key: string;
  items: TvChangeItem[];
}

export interface TvSeriesChangesResponse {
  changes: TvChangeGroup[];
}

export interface TvSeriesChangesParams {
  end_date?: string;
  page?: number;
  start_date?: string;
}

export interface ContentRating {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

export interface TvContentRatingsResponse {
  results: ContentRating[];
  id: number;
}

export interface TvCreditsResponse {
  cast: CastMember[];
  crew: CrewMember[];
  id: number;
}

export interface TvCreditsParams {
  language?: string;
}

export interface EpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: Network;
  type: number;
}

export interface TvEpisodeGroupsResponse {
  results: EpisodeGroup[];
  id: number;
}

export interface TvSeriesExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface TvSeriesImagesResponse {
  backdrops: ImageData[];
  id: number;
  logos: ImageData[];
  posters: ImageData[];
}

export interface TvSeriesImagesParams {
  include_image_language?: string;
  language?: string;
}

export interface TvSeriesKeywordsResponse {
  id: number;
  results: Keyword[];
}

export interface TvListEntry {
  description: string;
  favorite_count: number;
  item_count: number;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  poster_path: string | null;
}

export interface TvSeriesListsResponse {
  id: number;
  page: number;
  results: TvListEntry[];
  total_pages: number;
  total_results: number;
}

export interface TvSeriesListsParams {
  language?: string;
  page?: number;
}

export interface TvSeriesRecommendationsParams {
  language?: string;
  page?: number;
}

export type TvSeriesSimilarParams = TvSeriesRecommendationsParams;

export interface TvSeriesReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface TvSeriesReviewsParams {
  language?: string;
  page?: number;
}

export interface ScreenedEpisode {
  id: number;
  episode_number: number;
  season_number: number;
}

export interface TvScreenedTheatricallyResponse {
  id: number;
  results: ScreenedEpisode[];
}

export interface TvTranslationData {
  name: string;
  overview: string;
  homepage: string;
  tagline: string;
}

export interface TvTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TvTranslationData;
}

export interface TvSeriesTranslationsResponse {
  id: number;
  translations: TvTranslation[];
}

export interface TvSeriesVideosResponse {
  id: number;
  results: Video[];
}

export interface TvSeriesVideosParams {
  include_video_language?: string;
  language?: string;
}

export interface TvSeriesWatchProvidersResponse {
  id: number;
  results: Record<string, CountryWatchProviders>;
}

export interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface TvSeasonEpisode {
  air_date: string | null;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string | null;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: GuestStar[];
}

export interface TvSeasonDetails {
  _id: string;
  air_date: string | null;
  episodes: TvSeasonEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export type TvSeasonAppendToResponseValue =
  | "account_states"
  | "aggregate_credits"
  | "changes"
  | "credits"
  | "external_ids"
  | "images"
  | "translations"
  | "videos"
  | "watch/providers";

export interface TvSeasonAppendToResponseMap {
  account_states: TvSeasonAccountStates;
  aggregate_credits: TvAggregateCreditsResponse;
  changes: TvSeriesChangesResponse;
  credits: TvCreditsResponse;
  external_ids: TvSeasonExternalIdsResponse;
  images: TvSeasonImagesResponse;
  translations: TvSeriesTranslationsResponse;
  videos: TvSeriesVideosResponse;
  "watch/providers": TvSeriesWatchProvidersResponse;
}

export type WithTvSeasonAppendToResponse<T extends TvSeasonAppendToResponseValue[]> =
  TvSeasonDetails & {
    [K in T[number]]: TvSeasonAppendToResponseMap[K];
  };

export interface TvSeasonDetailsParams {
  append_to_response?: TvSeasonAppendToResponseValue[];
  language?: string;
}

export interface TvSeasonEpisodeState {
  id: number;
  episode_number: number;
  rated: { value: number } | null;
}

export interface TvSeasonAccountStates {
  id: number;
  results: TvSeasonEpisodeState[];
}

export type TvSeasonAccountStatesParams = TvSeriesAccountStatesParams;

export interface TvSeasonExternalIdsResponse {
  id: number;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
}

export interface TvSeasonImagesResponse {
  id: number;
  posters: ImageData[];
}

export type TvSeasonImagesParams = TvSeriesImagesParams;

export type TvSeasonVideosParams = TvSeriesVideosParams;

export interface TvEpisodeDetails {
  air_date: string | null;
  crew: CrewMember[];
  episode_number: number;
  guest_stars: GuestStar[];
  name: string;
  overview: string;
  id: number;
  production_code: string | null;
  runtime: number | null;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export type TvEpisodeAppendToResponseValue =
  | "account_states"
  | "changes"
  | "credits"
  | "external_ids"
  | "images"
  | "translations"
  | "videos";

export interface TvEpisodeAppendToResponseMap {
  account_states: TvEpisodeAccountStates;
  changes: TvSeriesChangesResponse;
  credits: TvEpisodeCreditsResponse;
  external_ids: TvEpisodeExternalIdsResponse;
  images: TvEpisodeImagesResponse;
  translations: TvSeriesTranslationsResponse;
  videos: TvSeriesVideosResponse;
}

export type WithTvEpisodeAppendToResponse<T extends TvEpisodeAppendToResponseValue[]> =
  TvEpisodeDetails & {
    [K in T[number]]: TvEpisodeAppendToResponseMap[K];
  };

export interface TvEpisodeDetailsParams {
  append_to_response?: TvEpisodeAppendToResponseValue[];
  language?: string;
}

export interface TvEpisodeAccountStates {
  id: number;
  favorite: boolean;
  rated: { value: number } | null;
  watchlist: boolean;
}

export type TvEpisodeAccountStatesParams = TvSeriesAccountStatesParams;

export interface TvEpisodeCreditsResponse {
  cast: CastMember[];
  crew: CrewMember[];
  guest_stars: GuestStar[];
  id: number;
}

export interface TvEpisodeCreditsParams {
  language?: string;
}

export interface TvEpisodeExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
}

export interface TvEpisodeImagesResponse {
  id: number;
  stills: ImageData[];
}

export type TvEpisodeImagesParams = TvSeriesImagesParams;

export type TvEpisodeVideosParams = TvSeriesVideosParams;

export interface TvEpisodeGroupEpisode {
  air_date: string | null;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string | null;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  order: number;
}

export interface TvEpisodeGroupGroup {
  id: string;
  name: string;
  order: number;
  episodes: TvEpisodeGroupEpisode[];
  locked: boolean;
}

export interface TvEpisodeGroupDetails {
  id: string;
  name: string;
  description: string;
  episode_count: number;
  group_count: number;
  groups: TvEpisodeGroupGroup[];
  network: Network;
  type: number;
}
