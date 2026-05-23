import axios, { type AxiosInstance } from "axios";
import { AccountClient } from "./client/account/index.ts";
import { AuthenticationClient } from "./client/authentication/index.ts";
import { CertificationClient } from "./client/certification/index.ts";
import { ChangesClient } from "./client/changes/index.ts";
import { CollectionClient } from "./client/collection/index.ts";
import { CompanyClient } from "./client/company/index.ts";
import { ConfigurationClient } from "./client/configuration/index.ts";

export interface TMDBClientConfig {
  accessToken?: string;
  apiKey?: string;
}

export class TMDBClient {
  private client: AxiosInstance;
  public account: AccountClient;
  public authentication: AuthenticationClient;
  public certification: CertificationClient;
  public changes: ChangesClient;
  public collection: CollectionClient;
  public company: CompanyClient;
  public configuration: ConfigurationClient;

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
    this.authentication = new AuthenticationClient(this.client);
    this.certification = new CertificationClient(this.client);
    this.changes = new ChangesClient(this.client);
    this.collection = new CollectionClient(this.client);
    this.company = new CompanyClient(this.client);
    this.configuration = new ConfigurationClient(this.client);
  }

  /**
   * Get system wide configuration information (e.g. image URLs, sizes, etc.)
   * @see https://developer.themoviedb.org/reference/configuration-details
   */
  async getConfiguration(): Promise<import("./types/configuration.ts").ConfigurationDetails> {
    return this.configuration.getDetails();
  }
}
