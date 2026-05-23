export interface ConfigurationImages {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface ConfigurationDetails {
  images: ConfigurationImages;
  change_keys: string[];
}

export interface CountryInfo {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface GetCountriesParams {
  language?: string;
}

export interface JobDepartment {
  department: string;
  jobs: string[];
}

export interface LanguageInfo {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export interface TimezoneInfo {
  iso_3166_1: string;
  zones: string[];
}
