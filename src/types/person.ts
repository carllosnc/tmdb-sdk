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

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}

export interface PersonDetailsParams {
  append_to_response?: string;
  language?: string;
}

export interface PersonChangeItem {
  id: string;
  action: string;
  time: string;
  iso_639_1: string;
  iso_3166_1: string;
  value: string;
}

export interface PersonChange {
  key: string;
  items: PersonChangeItem[];
}

export interface PersonChangesResponse {
  changes: PersonChange[];
}

export interface PersonChangesParams {
  end_date?: string;
  page?: number;
  start_date?: string;
}

export interface MovieCastCredit {
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
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCrewCredit {
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
  credit_id: string;
  department: string;
  job: string;
}

export interface PersonMovieCreditsResponse {
  id: number;
  cast: MovieCastCredit[];
  crew: MovieCrewCredit[];
}

export interface PersonMovieCreditsParams {
  language?: string;
}

export interface TvCastCredit {
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
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface TvCrewCredit {
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
  credit_id: string;
  department: string;
  episode_count: number;
  job: string;
}

export interface PersonTvCreditsResponse {
  id: number;
  cast: TvCastCredit[];
  crew: TvCrewCredit[];
}

export interface PersonTvCreditsParams {
  language?: string;
}

export interface CombinedCreditCast {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

export interface CombinedCreditCrew {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
}

export interface CombinedCreditsResponse {
  id: number;
  cast: CombinedCreditCast[];
  crew: CombinedCreditCrew[];
}

export interface CombinedCreditsParams {
  language?: string;
}

export interface PersonExternalIds {
  id: number;
  freebase_mid: string | null;
  freebase_id: string | null;
  imdb_id: string | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

export interface PersonProfile {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface PersonImagesResponse {
  id: number;
  profiles: PersonProfile[];
}

export interface TaggedImageMedia {
  adult?: boolean;
  backdrop_path?: string | null;
  id: number;
  title?: string;
  name?: string;
  original_language?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string | null;
  media_type: string;
  genre_ids?: number[];
  popularity?: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface TaggedImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
  image_type: string;
  media: TaggedImageMedia;
  media_type: string;
}

export interface PersonTaggedImagesResponse {
  id: number;
  page: number;
  results: TaggedImage[];
  total_pages: number;
  total_results: number;
}

export interface PersonTaggedImagesParams {
  page?: number;
}

export interface PersonTranslationData {
  biography: string;
  name: string;
}

export interface PersonTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: PersonTranslationData;
}

export interface PersonTranslationsResponse {
  id: number;
  translations: PersonTranslation[];
}
