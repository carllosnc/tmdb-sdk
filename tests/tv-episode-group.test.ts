import { describe, expect, mock, test } from "bun:test";
import { type HttpClient } from "../src/http/types.js";
import { TvEpisodeGroupClient } from "../src/client/tv-episode-group/index.js";
import { TMDBClient } from "../src/index.js";

const mockGroupData = {
  id: "some-group-id",
  name: "Group A",
  description: "Episodes grouped by some criteria",
  episode_count: 4,
  group_count: 2,
  groups: [
    {
      id: "group-1",
      name: "Part 1",
      order: 0,
      episodes: [
        {
          air_date: "2011-04-17",
          episode_number: 1,
          id: 63056,
          name: "Winter Is Coming",
          overview: "",
          production_code: "",
          runtime: 62,
          season_number: 1,
          show_id: 1399,
          still_path: "/test.jpg",
          vote_average: 7.8,
          vote_count: 100,
          order: 0,
        },
      ],
      locked: false,
    },
  ],
  network: {
    id: 49,
    logo_path: "/test.png",
    name: "HBO",
    origin_country: "US",
  },
  type: 1,
};

describe("TvEpisodeGroupClient", () => {
  test("should fetch episode group details", async () => {
    const get = mock(() => Promise.resolve({ data: mockGroupData }));
    const client = new TvEpisodeGroupClient({ get } as unknown as HttpClient);

    const response = await client.getDetails("some-group-id");

    expect(get).toHaveBeenCalledWith("tv/episode_group/some-group-id");
    expect(response).toEqual(mockGroupData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch episode group details from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const groupsResponse = await client.tv.getEpisodeGroups(1399);
      expect(groupsResponse.results.length).toBeGreaterThan(0);

      const groupId = groupsResponse.results[0]!.id;
      const response = await client.tvEpisodeGroup.getDetails(groupId);
      expect(response).toBeDefined();
      expect(response.id).toBeTypeOf("string");
      expect(response.name).toBeTypeOf("string");
      expect(response.groups).toBeDefined();
      expect(Array.isArray(response.groups)).toBe(true);
    });
  } else {
    test.skip("live tv-episode-group tests (requires TMDB_TOKEN in env)", () => {});
  }
});
