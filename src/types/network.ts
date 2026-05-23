export interface NetworkDetails {
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface NetworkAlternativeName {
  name: string;
  type: string;
}

export interface NetworkAlternativeNamesResponse {
  id: number;
  results: NetworkAlternativeName[];
}

export interface NetworkLogo {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface NetworkImagesResponse {
  id: number;
  logos: NetworkLogo[];
}
