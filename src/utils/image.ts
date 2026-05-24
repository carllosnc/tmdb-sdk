export const BACKDROP_SIZES = ["w300", "w780", "w1280", "original"] as const;
export const LOGO_SIZES = ["w45", "w92", "w154", "w185", "w300", "w500", "original"] as const;
export const POSTER_SIZES = ["w92", "w154", "w185", "w342", "w500", "w780", "original"] as const;
export const PROFILE_SIZES = ["w45", "w185", "h632", "original"] as const;
export const STILL_SIZES = ["w92", "w185", "w300", "original"] as const;

export type BackdropSize = typeof BACKDROP_SIZES[number];
export type LogoSize = typeof LOGO_SIZES[number];
export type PosterSize = typeof POSTER_SIZES[number];
export type ProfileSize = typeof PROFILE_SIZES[number];
export type StillSize = typeof STILL_SIZES[number];

export type ImageType = "backdrop" | "logo" | "poster" | "profile" | "still";

export interface ImageUrlBuilderConfig {
  backdropSizes?: string[];
  baseUrl?: string;
  logoSizes?: string[];
  posterSizes?: string[];
  profileSizes?: string[];
  secureBaseUrl?: string;
  stillSizes?: string[];
}

const DEFAULT_BASE_URL = "https://image.tmdb.org/t/p/";

export class ImageUrlBuilder {
  private baseUrl: string;
  private backdropSizes: Set<string>;
  private logoSizes: Set<string>;
  private posterSizes: Set<string>;
  private profileSizes: Set<string>;
  private stillSizes: Set<string>;

  constructor(config?: ImageUrlBuilderConfig) {
    this.baseUrl = config?.baseUrl ?? DEFAULT_BASE_URL;
    this.backdropSizes = new Set(config?.backdropSizes ?? BACKDROP_SIZES);
    this.logoSizes = new Set(config?.logoSizes ?? LOGO_SIZES);
    this.posterSizes = new Set(config?.posterSizes ?? POSTER_SIZES);
    this.profileSizes = new Set(config?.profileSizes ?? PROFILE_SIZES);
    this.stillSizes = new Set(config?.stillSizes ?? STILL_SIZES);
  }

  static fromConfiguration(config: {
    base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  }): ImageUrlBuilder {
    return new ImageUrlBuilder({
      baseUrl: config.base_url,
      backdropSizes: config.backdrop_sizes,
      logoSizes: config.logo_sizes,
      posterSizes: config.poster_sizes,
      profileSizes: config.profile_sizes,
      stillSizes: config.still_sizes,
    });
  }

  private validateSize(sizes: Set<string>, size: string, type: string): void {
    if (!sizes.has(size)) {
      throw new Error(`Invalid ${type} size "${size}". Valid sizes: ${[...sizes].join(", ")}`);
    }
  }

  getUrl(filePath: string, size: string): string {
    return `${this.baseUrl}${size}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  }

  getBackdropUrl(filePath: string, size: BackdropSize): string {
    this.validateSize(this.backdropSizes, size, "backdrop");
    return this.getUrl(filePath, size);
  }

  getLogoUrl(filePath: string, size: LogoSize): string {
    this.validateSize(this.logoSizes, size, "logo");
    return this.getUrl(filePath, size);
  }

  getPosterUrl(filePath: string, size: PosterSize): string {
    this.validateSize(this.posterSizes, size, "poster");
    return this.getUrl(filePath, size);
  }

  getProfileUrl(filePath: string, size: ProfileSize): string {
    this.validateSize(this.profileSizes, size, "profile");
    return this.getUrl(filePath, size);
  }

  getStillUrl(filePath: string, size: StillSize): string {
    this.validateSize(this.stillSizes, size, "still");
    return this.getUrl(filePath, size);
  }
}
