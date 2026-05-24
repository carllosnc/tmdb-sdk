export interface WatchProvidersRegionsParams {
  language?: string;
}

export interface WatchProvidersListParams {
  language?: string;
  watchRegion?: string;
}

export interface WatchProviderRegion {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export interface WatchProviderRegionResponse {
  results: WatchProviderRegion[];
}

export interface WatchProviderInfo {
  display_priorities: Record<string, number>;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}

export interface WatchProvidersResponse {
  results: WatchProviderInfo[];
}
