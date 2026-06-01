export interface CollectionPart {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CollectionDetails {
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
}

export interface GetCollectionDetailsParams {
  language?: string;
  appendToResponse?: string[];
}

export interface CollectionImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CollectionImagesResponse {
  id: number;
  backdrops: CollectionImage[];
  posters: CollectionImage[];
}

export interface GetCollectionImagesParams {
  language?: string;
  includeImageLanguage?: string;
}

export interface CollectionTranslationData {
  title: string;
  overview: string;
  homepage: string;
}

export interface CollectionTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: CollectionTranslationData;
}

export interface CollectionTranslationsResponse {
  id: number;
  translations: CollectionTranslation[];
}
