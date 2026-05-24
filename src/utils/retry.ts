import { type AxiosError, type AxiosInstance } from "axios";

export interface RetryConfig {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  retryOnStatus?: number[];
}

const DEFAULT_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  retryOnStatus: [429, 502, 503, 504],
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(error: AxiosError, statusCodes: number[]): boolean {
  return (
    error.response !== undefined &&
    statusCodes.includes(error.response.status)
  );
}

export function setupRetry(instance: AxiosInstance, config?: RetryConfig): void {
  const { maxRetries, baseDelay, maxDelay, retryOnStatus } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  instance.interceptors.response.use(
    undefined,
    async (error: AxiosError) => {
      if (!isRetryable(error, retryOnStatus)) throw error;

      const retryCount = (error.config as any)?._retryCount ?? 0;
      if (retryCount >= maxRetries) throw error;

      const delay = Math.min(
        baseDelay * Math.pow(2, retryCount) + Math.random() * 500,
        maxDelay,
      );

      (error.config as any)._retryCount = retryCount + 1;

      await sleep(delay);
      return instance.request(error.config!);
    },
  );
}
