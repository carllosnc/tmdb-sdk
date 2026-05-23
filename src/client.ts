import axios, { type AxiosInstance } from "axios";
import { AccountClient } from "./client/account/index.ts";
import { AuthenticationClient } from "./client/authentication/index.ts";
import { CertificationClient } from "./client/certification/index.ts";
import { ChangesClient } from "./client/changes/index.ts";
import { CollectionClient } from "./client/collection/index.ts";
import { CompanyClient } from "./client/company/index.ts";
import { ConfigurationClient } from "./client/configuration/index.ts";
import { DiscoverClient } from "./client/discover/index.ts";
import { FindClient } from "./client/find/index.ts";
import { GenreClient } from "./client/genre/index.ts";
import { GuestSessionClient } from "./client/guest-session/index.ts";
import { KeywordClient } from "./client/keyword/index.ts";
import { ListClient } from "./client/list/index.ts";
import { MovieClient } from "./client/movie/index.ts";
import { NetworkClient } from "./client/network/index.ts";
import { PersonClient } from "./client/person/index.ts";
import { ReviewClient } from "./client/review/index.ts";

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
  public discover: DiscoverClient;
  public find: FindClient;
  public genre: GenreClient;
  public guestSession: GuestSessionClient;
  public keyword: KeywordClient;
  public list: ListClient;
  public movie: MovieClient;
  public network: NetworkClient;
  public person: PersonClient;
  public review: ReviewClient;

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
    this.discover = new DiscoverClient(this.client);
    this.find = new FindClient(this.client);
    this.genre = new GenreClient(this.client);
    this.guestSession = new GuestSessionClient(this.client);
    this.keyword = new KeywordClient(this.client);
    this.list = new ListClient(this.client);
    this.movie = new MovieClient(this.client);
    this.network = new NetworkClient(this.client);
    this.person = new PersonClient(this.client);
    this.review = new ReviewClient(this.client);
  }

  /**
   * Get system wide configuration information (e.g. image URLs, sizes, etc.)
   * @see https://developer.themoviedb.org/reference/configuration-details
   */
  async getConfiguration(): Promise<import("./types/configuration.ts").ConfigurationDetails> {
    return this.configuration.getDetails();
  }
}
