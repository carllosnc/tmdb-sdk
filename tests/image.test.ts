import { describe, expect, test } from "bun:test";
import {
  BACKDROP_SIZES,
  ImageUrlBuilder,
  LOGO_SIZES,
  POSTER_SIZES,
  PROFILE_SIZES,
  STILL_SIZES,
} from "../src/utils/image.js";

describe("ImageUrlBuilder", () => {
  test("should build URL with defaults", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getUrl("/abc.jpg", "w500");
    expect(url).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  test("should handle filePath without leading slash", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getUrl("abc.jpg", "w500");
    expect(url).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  test("should accept custom base URL", () => {
    const builder = new ImageUrlBuilder({ baseUrl: "https://cdn.example.com/t/p/" });
    const url = builder.getUrl("/abc.jpg", "w500");
    expect(url).toBe("https://cdn.example.com/t/p/w500/abc.jpg");
  });

  test("should build poster URL with typed size", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getPosterUrl("/abc.jpg", "w500");
    expect(url).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  test("should build backdrop URL with typed size", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getBackdropUrl("/abc.jpg", "w1280");
    expect(url).toBe("https://image.tmdb.org/t/p/w1280/abc.jpg");
  });

  test("should build logo URL with typed size", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getLogoUrl("/abc.svg", "original");
    expect(url).toBe("https://image.tmdb.org/t/p/original/abc.svg");
  });

  test("should build profile URL with typed size", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getProfileUrl("/abc.jpg", "h632");
    expect(url).toBe("https://image.tmdb.org/t/p/h632/abc.jpg");
  });

  test("should build still URL with typed size", () => {
    const builder = new ImageUrlBuilder();
    const url = builder.getStillUrl("/abc.jpg", "w300");
    expect(url).toBe("https://image.tmdb.org/t/p/w300/abc.jpg");
  });

  test("should validate backdrop size", () => {
    const builder = new ImageUrlBuilder();
    expect(() => builder.getBackdropUrl("/abc.jpg", "w500" as any)).toThrow(
      `Invalid backdrop size "w500". Valid sizes: ${BACKDROP_SIZES.join(", ")}`
    );
  });

  test("should validate poster size", () => {
    const builder = new ImageUrlBuilder();
    expect(() => builder.getPosterUrl("/abc.jpg", "w45" as any)).toThrow(
      `Invalid poster size "w45". Valid sizes: ${POSTER_SIZES.join(", ")}`
    );
  });

  test("should validate logo size", () => {
    const builder = new ImageUrlBuilder();
    expect(() => builder.getLogoUrl("/abc.svg", "w3000" as any)).toThrow(
      `Invalid logo size "w3000". Valid sizes: ${LOGO_SIZES.join(", ")}`
    );
  });

  test("should validate profile size", () => {
    const builder = new ImageUrlBuilder();
    expect(() => builder.getProfileUrl("/abc.jpg", "w999" as any)).toThrow(
      `Invalid profile size "w999". Valid sizes: ${PROFILE_SIZES.join(", ")}`
    );
  });

  test("should validate still size", () => {
    const builder = new ImageUrlBuilder();
    expect(() => builder.getStillUrl("/abc.jpg", "originalx" as any)).toThrow(
      `Invalid still size "originalx". Valid sizes: ${STILL_SIZES.join(", ")}`
    );
  });

  test("should accept custom size sets for validation", () => {
    const builder = new ImageUrlBuilder({
      posterSizes: ["w500", "original"],
    });
    expect(() => builder.getPosterUrl("/abc.jpg", "w92" as any)).toThrow(
      `Invalid poster size "w92". Valid sizes: w500, original`
    );
    const url = builder.getPosterUrl("/abc.jpg", "w500");
    expect(url).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  test("fromConfiguration should map snake_case fields", () => {
    const builder = ImageUrlBuilder.fromConfiguration({
      base_url: "https://cdn.tmdb.org/t/p/",
      backdrop_sizes: ["w300", "original"],
      logo_sizes: ["w45", "original"],
      poster_sizes: ["w92", "original"],
      profile_sizes: ["w45", "original"],
      still_sizes: ["w92", "original"],
    });
    const url = builder.getPosterUrl("/abc.jpg", "original");
    expect(url).toBe("https://cdn.tmdb.org/t/p/original/abc.jpg");
    expect(() => builder.getPosterUrl("/abc.jpg", "w500" as any)).toThrow(
      `Invalid poster size "w500". Valid sizes: w92, original`
    );
  });
});
