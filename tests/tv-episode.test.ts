import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { TvEpisodeClient } from "../src/client/tv-episode/index.js";
import { TMDBClient } from "../src/index.js";

const mockEpisodeData = {
  air_date: "2011-04-17",
  crew: [],
  episode_number: 1,
  guest_stars: [],
  name: "Winter Is Coming",
  overview: "Jon Arryn, the Hand of the King, dies.",
  id: 63056,
  production_code: "",
  runtime: 62,
  season_number: 1,
  still_path: "/test.jpg",
  vote_average: 7.8,
  vote_count: 100,
};

function createClient() {
  const get = mock(() => Promise.resolve({ data: mockEpisodeData }));
  return { get, client: new TvEpisodeClient({ get } as unknown as HttpClient) };
}

describe("TvEpisodeClient", () => {
  test("should fetch episode details", async () => {
    const { get, client } = createClient();
    await client.getDetails(1399, 1, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1", { params: {} });
  });

  test("should fetch episode details with append_to_response", async () => {
    const get = mock(() => Promise.resolve({ data: mockEpisodeData }));
    const client = new TvEpisodeClient({ get } as unknown as HttpClient);

    await client.getDetails(1399, 1, 1, { append_to_response: ["credits", "videos"] });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1", {
      params: { append_to_response: "credits,videos" },
    });
  });

  test("should fetch episode account states", async () => {
    const { get, client } = createClient();
    await client.getAccountStates(1399, 1, 1, { session_id: "test" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/account_states", {
      params: { session_id: "test" },
    });
  });

  test("should fetch episode changes by id", async () => {
    const { get, client } = createClient();
    await client.getChangesById(63056);

    expect(get).toHaveBeenCalledWith("tv/episode/63056/changes", { params: {} });
  });

  test("should fetch episode credits", async () => {
    const { get, client } = createClient();
    await client.getCredits(1399, 1, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/credits", { params: {} });
  });

  test("should fetch episode external ids", async () => {
    const { get, client } = createClient();
    await client.getExternalIds(1399, 1, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/external_ids");
  });

  test("should fetch episode images", async () => {
    const { get, client } = createClient();
    await client.getImages(1399, 1, 1, { language: "en" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/images", {
      params: { language: "en" },
    });
  });

  test("should fetch episode translations", async () => {
    const { get, client } = createClient();
    await client.getTranslations(1399, 1, 1);

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/translations");
  });

  test("should fetch episode videos", async () => {
    const { get, client } = createClient();
    await client.getVideos(1399, 1, 1, { language: "en-US" });

    expect(get).toHaveBeenCalledWith("tv/1399/season/1/episode/1/videos", {
      params: { language: "en-US" },
    });
  });

  test("should add episode rating", async () => {
    const post = mock(() => Promise.resolve({ data: { status_code: 1, status_message: "Success" } }));
    const client = new TvEpisodeClient({ post } as unknown as HttpClient);

    await client.addRating(1399, 1, 1, { session_id: "s" }, { value: 8 });

    expect(post).toHaveBeenCalledWith(
      "tv/1399/season/1/episode/1/rating",
      { value: 8 },
      { params: { session_id: "s" } }
    );
  });

  test("should delete episode rating", async () => {
    const del = mock(() => Promise.resolve({ data: { status_code: 13, status_message: "Deleted" } }));
    const client = new TvEpisodeClient({ delete: del } as unknown as HttpClient);

    await client.deleteRating(1399, 1, 1, { session_id: "s" });

    expect(del).toHaveBeenCalledWith(
      "tv/1399/season/1/episode/1/rating",
      { params: { session_id: "s" } }
    );
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch episode details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tvEpisode.getDetails(1399, 1, 1);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
      expect(response.name).toBeTypeOf("string");
      expect(response.episode_number).toBe(1);
    });

    test("should fetch episode credits from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.tvEpisode.getCredits(1399, 1, 1);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("number");
      expect(Array.isArray(response.cast)).toBe(true);
    });
  } else {
    test.skip("live tv-episode tests (requires TMDB_TOKEN in env)", () => {});
  }
});
