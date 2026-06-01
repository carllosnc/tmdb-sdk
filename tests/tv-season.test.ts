import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { TvSeasonClient } from "../src/client/tv-season/index.js";
import { TMDBClient } from "../src/index.js";

const mockSeasonData = {
  _id: "4d985c8fc3a3686b0c00d67b",
  air_date: "2011-04-17",
  episodes: [
    {
      air_date: "2011-04-17",
      episode_number: 1,
      episode_type: "standard",
      id: 63056,
      name: "Winter Is Coming",
      overview: "Jon Arryn, the Hand of the King, dies.",
      production_code: "",
      runtime: 62,
      season_number: 1,
      show_id: 1399,
      still_path: "/test.jpg",
      vote_average: 7.8,
      vote_count: 100,
      crew: [],
      guest_stars: [],
    },
  ],
  name: "Season 1",
  overview: "The first season of Game of Thrones.",
  id: 3627,
  poster_path: "/test.jpg",
  season_number: 1,
  vote_average: 8.0,
};

function createClient() {
  const get = mock(() => Promise.resolve({ data: mockSeasonData }));
  return { get, client: new TvSeasonClient({ get } as unknown as HttpClient) };
}

describe("TvSeasonClient", () => {
  test("should fetch season details", async () => {
    const { get, client } = createClient();
    await client.getDetails(1399, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1", { params: {} });
  });

  test("should fetch season details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: mockSeasonData }));
    const client = new TvSeasonClient({ get } as unknown as HttpClient);

    await client.getDetails(1399, 1, { appendToResponse: ["credits", "videos"] });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1", {
      params: { append_to_response: "credits,videos" },
    });
  });

  test("should fetch season account states", async () => {
    const { get, client } = createClient();
    await client.getAccountStates(1399, 1, { sessionId: "test-session" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/account_states", {
      params: { session_id: "test-session" },
    });
  });

  test("should fetch season aggregate credits", async () => {
    const { get, client } = createClient();
    await client.getAggregateCredits(1399, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/aggregate_credits", { params: {} });
  });

  test("should fetch season changes by id", async () => {
    const { get, client } = createClient();
    await client.getChangesById(3627, { startDate: "2024-01-01" });

    expect(get).toHaveBeenCalledWith("tv/season/3627/changes", {
      params: { start_date: "2024-01-01" },
    });
  });

  test("should fetch season credits", async () => {
    const { get, client } = createClient();
    await client.getCredits(1399, 1, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/credits", {
      params: { language: "en-US" },
    });
  });

  test("should fetch season external ids", async () => {
    const { get, client } = createClient();
    await client.getExternalIds(1399, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/external_ids");
  });

  test("should fetch season images", async () => {
    const { get, client } = createClient();
    await client.getImages(1399, 1, { language: "en" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/images", {
      params: { language: "en" },
    });
  });

  test("should fetch season translations", async () => {
    const { get, client } = createClient();
    await client.getTranslations(1399, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/translations");
  });

  test("should fetch season videos", async () => {
    const { get, client } = createClient();
    await client.getVideos(1399, 1, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/videos", {
      params: { language: "en-US" },
    });
  });

  test("should fetch season watch providers", async () => {
    const { get, client } = createClient();
    await client.getWatchProviders(1399, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/watch/providers");
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch season details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tvSeason.getDetails(1399, 1);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
      expect(response.name).toBeTypeOf("string");
      expect(response.season_number).toBe(1);
      expect(Array.isArray(response.episodes)).toBe(true);
    });

    test("should fetch season credits from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tvSeason.getCredits(1399, 1);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
      expect(Array.isArray(response.cast)).toBe(true);
    });

    test("should fetch season external ids from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tvSeason.getExternalIds(1399, 1);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
    });
  } else {
    test.skip("live tv-season tests (requires TMDB_TOKEN in env)", () => {});
  }
});
