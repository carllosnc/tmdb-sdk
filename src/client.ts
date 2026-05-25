import axios, { type AxiosInstance } from "axios";
import { createErrorInterceptor } from "./errors.js";
import { setupRetry, type RetryConfig } from "./utils/retry.js";
import { AccountClient } from "./client/account/index.js";
import { AccountV4Client } from "./client/account-v4/index.js";
import { AuthV4Client } from "./client/auth-v4/index.js";
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
import { ListV4Client } from "./client/list-v4/index.js";
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
  axiosInstance?: AxiosInstance;
}

export class TMDBClient {
  public http: AxiosInstance;
  public account: AccountClient;
  public accountV4: AccountV4Client;
  public authV4: AuthV4Client;
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
  public listV4: ListV4Client;
  public movie: MovieClient;
  public network: NetworkClient;
  public person: PersonClient;
  public review: ReviewClient;
  public search: SearchClient;
  public trending: TrendingClient;
  public tv: TvClient;
  public watchProviders: WatchProvidersClient;

  constructor(config: TMDBClientConfig) {
    if (config.axiosInstance) {
      this.http = config.axiosInstance;
    } else {
      const headers: Record<string, string> = {};
      const params: Record<string, string> = {};

      if (config.accessToken) {
        headers["Authorization"] = `Bearer ${config.accessToken}`;
      } else if (config.apiKey) {
        params["api_key"] = config.apiKey;
      } else {
        throw new Error("Either accessToken or apiKey must be provided to TMDBClient.");
      }

      this.http = axios.create({
        baseURL: "https://api.themoviedb.org/3/",
        headers,
        params,
      });
    }

    this.http.interceptors.response.use(undefined, createErrorInterceptor());

    if (config.retry) {
      setupRetry(this.http, config.retry === true ? undefined : config.retry);
    }

    this.account = new AccountClient(this.http);
    this.accountV4 = new AccountV4Client(this.http);
    this.authV4 = new AuthV4Client(this.http);
    this.authentication = new AuthenticationClient(this.http);
    this.certification = new CertificationClient(this.http);
    this.changes = new ChangesClient(this.http);
    this.collection = new CollectionClient(this.http);
    this.company = new CompanyClient(this.http);
    this.configuration = new ConfigurationClient(this.http);
    this.discover = new DiscoverClient(this.http);
    this.find = new FindClient(this.http);
    this.genre = new GenreClient(this.http);
    this.guestSession = new GuestSessionClient(this.http);
    this.keyword = new KeywordClient(this.http);
    this.list = new ListClient(this.http);
    this.listV4 = new ListV4Client(this.http);
    this.movie = new MovieClient(this.http);
    this.network = new NetworkClient(this.http);
    this.person = new PersonClient(this.http);
    this.review = new ReviewClient(this.http);
    this.search = new SearchClient(this.http);
    this.trending = new TrendingClient(this.http);
    this.tv = new TvClient(this.http);
    this.watchProviders = new WatchProvidersClient(this.http);
  }
}
