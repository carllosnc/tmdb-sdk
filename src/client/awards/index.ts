import type { AwardsInfo } from "../../types/awards.js";

interface OmdbMovieResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons?: string;
  Response: string;
}

function parseAwardsCounts(awardsStr: string): { wins: number; nominations: number } {
  let wins = 0;
  const winPatterns = [/Won\s+(\d+)/gi, /(\d+)\s+win/gi];
  for (const pattern of winPatterns) {
    const matches = awardsStr.matchAll(pattern);
    for (const match of matches) {
      wins += parseInt(match[1]!, 10);
    }
  }

  const nomsMatch = awardsStr.match(/(\d+)\s+nominations?/i);
  const nominations = nomsMatch ? parseInt(nomsMatch[1]!, 10) : 0;

  return { wins, nominations };
}

export class AwardsClient {
  private omdbApiKey: string;
  private baseUrl = "https://www.omdbapi.com";

  constructor(omdbApiKey: string) {
    this.omdbApiKey = omdbApiKey;
  }

  async getByImdbId(imdbId: string): Promise<AwardsInfo | null> {
    if (!imdbId) return null;

    const url = new URL(this.baseUrl);
    url.searchParams.set("i", imdbId);
    url.searchParams.set("apikey", this.omdbApiKey);

    const response = await fetch(url.toString());
    if (!response.ok) return null;

    const data = await response.json() as OmdbMovieResponse;
    if (data.Response === "False") return null;

    const { wins, nominations } = parseAwardsCounts(data.Awards ?? "");

    return {
      summary: data.Awards || null,
      wins,
      nominations,
      imdbRating: data.imdbRating && data.imdbRating !== "N/A" ? parseFloat(data.imdbRating) : null,
      imdbVotes: data.imdbVotes && data.imdbVotes !== "N/A" ? parseInt(data.imdbVotes.replace(/,/g, ""), 10) : null,
      metascore: data.Metascore && data.Metascore !== "N/A" ? parseInt(data.Metascore, 10) : null,
      ratings: (data.Ratings || []).map((r) => ({
        source: r.Source,
        value: r.Value,
      })),
    };
  }
}
