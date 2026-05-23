import { describe, expect, mock, test } from "bun:test";
import type { AxiosInstance } from "axios";
import { CertificationClient } from "../src/client/certification/index.ts";
import { TMDBClient } from "../src/index.ts";

describe("TMDBClient - Certification Namespace", () => {
  test("should fetch movie certifications with mock data", async () => {
    const mockData = {
      certifications: {
        US: [
          {
            certification: "PG-13",
            meaning: "Parents Strongly Cautioned",
            order: 3,
          },
        ],
      },
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CertificationClient({ get } as unknown as AxiosInstance);

    const response = await client.getMovieCertifications();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("certification/movie/list");
    expect(response).toEqual(mockData);
  });

  test("should fetch TV certifications with mock data", async () => {
    const mockData = {
      certifications: {
        US: [
          {
            certification: "TV-MA",
            meaning: "Mature Audience Only",
            order: 5,
          },
        ],
      },
    };

    const get = mock(() => Promise.resolve({ data: mockData }));
    const client = new CertificationClient({ get } as unknown as AxiosInstance);

    const response = await client.getTVCertifications();

    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("certification/tv/list");
    expect(response).toEqual(mockData);
  });

  const token = process.env.TMDB_TOKEN;

  if (token) {
    test("should fetch movie certifications from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.certification.getMovieCertifications();
      expect(response).toBeDefined();
      expect(response.certifications).toBeDefined();
      expect(response.certifications.US).toBeTypeOf("object");
      expect(Array.isArray(response.certifications.US)).toBe(true);
      const usCerts = response.certifications.US!;
      expect(usCerts.length).toBeGreaterThan(0);
      expect(usCerts[0]!.certification).toBeTypeOf("string");
      expect(usCerts[0]!.meaning).toBeTypeOf("string");
      expect(usCerts[0]!.order).toBeTypeOf("number");
    });

    test("should fetch TV certifications from live TMDB API", async () => {
      const client = new TMDBClient({ accessToken: token });
      const response = await client.certification.getTVCertifications();
      expect(response).toBeDefined();
      expect(response.certifications).toBeDefined();
      expect(response.certifications.US).toBeTypeOf("object");
      expect(Array.isArray(response.certifications.US)).toBe(true);
      const usCerts = response.certifications.US!;
      expect(usCerts.length).toBeGreaterThan(0);
      expect(usCerts[0]!.certification).toBeTypeOf("string");
      expect(usCerts[0]!.meaning).toBeTypeOf("string");
      expect(usCerts[0]!.order).toBeTypeOf("number");
    });
  } else {
    test.skip("live certification tests (requires TMDB_TOKEN in env)", () => {});
  }
});
