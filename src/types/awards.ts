export interface OmdbRating {
  source: string;
  value: string;
}

export interface AwardsInfo {
  summary: string | null;
  wins: number;
  nominations: number;
  imdbRating: number | null;
  imdbVotes: number | null;
  metascore: number | null;
  ratings: OmdbRating[];
}
