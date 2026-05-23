export interface CompanyDetails {
  description: string;
  headquarters: string;
  homepage: string;
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
  parent_company: CompanyParent | null;
}

export interface CompanyParent {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface CompanyAlternativeName {
  name: string;
  type: string;
}

export interface CompanyAlternativeNamesResponse {
  id: number;
  results: CompanyAlternativeName[];
}

export interface CompanyLogo {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  file_type: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CompanyImagesResponse {
  id: number;
  logos: CompanyLogo[];
}
