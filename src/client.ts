import axios, { type AxiosInstance } from "axios";
import { createErrorInterceptor } from "./errors.js";
import { setupRetry, type RetryConfig } from "./utils/retry.js";
import { AccountClient } from "./client/account/index.js";
import { AuthenticationClient } from "./client/authentication/index.js";
import { CertificationClient } from "./client/certification/index.js";
import { ChangesClient } from "./client/changes/index.js";
import { CollectionClient } from "./client/collection/index.js";
import { CompanyClient } from "./client/company/index.js";
import { ConfigurationClient } from "./client/configuration/index.js";
import { DiscoverClient } from "./client/discover/index.js";
import { FindClient } from "./client/find/index.js";
import { GenreClient } from "./client/genre/index.js";
import { GuestSessionClient } from "./client/guest-session/index.js";
import { KeywordClient } from "./client/keyword/index.js";
import { ListClient } from "./client/list/index.js";
import { MovieClient } from "./client/movie/index.js";
import { NetworkClient } from "./client/network/index.js";
import { PersonClient } from "./client/person/index.js";
import { ReviewClient } from "./client/review/index.js";
import { SearchClient } from "./client/search/index.js";
import { TrendingClient } from "./client/trending/index.js";
import { TvClient } from "./client/tv/index.js";
import { WatchProvidersClient } from "./client/watch-providers/index.js";

export interface TMDBClientConfig {
  accessToken?: string;
  apiKey?: string;
  retry?: boolean | RetryConfig;
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
  public search: SearchClient;
  public trending: TrendingClient;
  public tv: TvClient;
  public watchProviders: WatchProvidersClient;

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

    this.client.interceptors.response.use(undefined, createErrorInterceptor());

    if (config.retry) {
      setupRetry(this.client, config.retry === true ? undefined : config.retry);
    }

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
    this.search = new SearchClient(this.client);
    this.trending = new TrendingClient(this.client);
    this.tv = new TvClient(this.client);
    this.watchProviders = new WatchProvidersClient(this.client);
  }
}
