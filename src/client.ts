import axios, { type AxiosInstance } from "axios";
import { AccountClient } from "./client/account/index.ts";

export interface TMDBClientConfig {
  accessToken?: string;
  apiKey?: string;
}

export class TMDBClient {
  private client: AxiosInstance;
  public account: AccountClient;

  constructor(config: TMDBClientConfig) {
    const headers: Record<string, string> = {};
    const params: Record<string, string> = {};

    if (config.accessToken) {
      headers["Authorization"] = `Bearer ${config.accessToken}`;
    } else if (config.apiKey) {
      params["api_key"] = config.apiKey;
    } else {
      throw new Error("Either accessToken or apiKey must be provided to TMDBClient.");
    }

    this.client = axios.create({
      baseURL: "https://api.themoviedb.org/3/",
      headers,
      params,
    });

    this.account = new AccountClient(this.client);
  }

  /**
   * Get system wide configuration information (e.g. image URLs, sizes, etc.)
   */
  async getConfiguration(): Promise<any> {
    const response = await this.client.get("configuration");
    return response.data;
  }
}
