import type { CacheClientInterface } from '../../types/types';

export const getCacheClient = (): CacheClientInterface | undefined => {
  return global.cacheClient;
};

/**
 * Define the cache client on the global namespace.
 * This allows setting it up once in the instrumentation,
 * but utilising it within the request scope.
 */
export const setCacheClient = (client: CacheClientInterface): void => {
  global.cacheClient = client;
};
