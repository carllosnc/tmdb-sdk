---
name: tmdb-api
description: Environment knowledge, authentication, and endpoint patterns for the TMDB (The Movie Database) API.
---

# TMDB API Guidelines

Use this skill when designing, building, or updating the SDK client or integration for the TMDB API (v3/v4).

## Environment Details

- **API Base URL**: `https://api.themoviedb.org/3/`
- **Official Documentation**: `https://developer.themoviedb.org/`
- **Support Forum**: `https://www.themoviedb.org/talk/category/5047958519c29526b50017d6`

---

## 1. Authentication

TMDB API v3 support two authentication methods:
- **Bearer Token (Preferred)**: Send the **API Read Access Token** in the `Authorization` header as a Bearer token. This method is unified across v3 and v4.
  ```http
  Authorization: Bearer <<access_token>>
  ```
- **Query Parameter**: Send your API key in the `api_key` query parameter.
  ```http
  GET https://api.themoviedb.org/3/movie/11?api_key=<<api_key>>
  ```

---

## 2. Image URL Construction

Do not hardcode full image URLs. The TMDB API returns only partial paths (e.g. `/1E5baAaEse26fej7uHcjOgEE2t2.jpg`).

To construct a full image URL:
1. Retrieve the `base_url` (usually `https://image.tmdb.org/t/p/`) and the list of valid `file_sizes` by calling the `/configuration` endpoint:
   ```http
   GET https://api.themoviedb.org/3/configuration
   ```
2. Build the final URL using: `[base_url] + [file_size] + [file_path]`
   - Example poster size `w500`: `https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg`

### SVG Logos (Networks & Companies)
- SVG logos return a `.png` by default in the `logo_path` for backward compatibility.
- The original file format can be checked via the `file_type` field.
- For SVGs, request the `original` size because TMDB does not resize SVG vector files:
  - Example SVG: `https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg`

---

## 3. Append to Response (Request Optimization)

Avoid making multiple separate HTTP requests for related namespaces (e.g. movie details + videos + images). Use the `append_to_response` query parameter.

Supported on detail methods for:
- Movie (`/movie/{id}`)
- TV Show (`/tv/{id}`)
- TV Season (`/tv/{id}/season/{season_number}`)
- TV Episode (`/tv/{id}/season/{season_number}/episode/{episode_number}`)
- Person (`/person/{id}`)

### Example usage:
To get movie details, videos, and images in a single call:
```http
GET https://api.themoviedb.org/3/movie/11?append_to_response=videos,images
```
*Note: Sub-requests respect standard query parameters (like `language`). If querying images via `append_to_response`, use `include_image_language` to control language filters.*
