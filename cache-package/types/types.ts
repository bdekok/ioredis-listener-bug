import type { RedisOptions } from 'ioredis';

export interface RegisterOptions {
  /**
   * The cache client to use.
   */
  cacheClient: CacheClientInterface;

  /**
   * Override the global fetch function.
   *
   * @default true
   */
  overrideGlobalFetch?: boolean;
}

export interface CacheClientOptions {
  /**
   * The endpoint to connect the cache client to.
   *
   * Defaults to the `CACHE_ENDPOINT` environment variable.
   *
   * @default process.env.CACHE_ENDPOINT
   */
  endpoint?: string;

  /**
   * Options to pass to the redis client.
   */
  redisOptions?: RedisOptions;
}

export interface CacheClientInterface {
  /**
   * Get an entry from the cache
   *
   * @param {string} key The cache key
   * @return {Promise<string | null>} The cache entry
   */
  get(key: string): Promise<string | null>;

  /**
   * Set an entry in the cache
   *
   * @param {string} key The cache key
   * @param {string} value The cache value
   * @param {string} ttlSeconds The cache ttl (Time To Live) in seconds
   * @return {Promise<void>}
   */
  set(key: string, value: string, ttlSeconds: number): Promise<void>;

  /**
   * Delete an entry from the cache
   *
   * @param {string} key The cache key
   * @return {Promise<boolean>} Whether the cache entry was deleted
   */
  delete(key: string): Promise<boolean>;

  /**
   * Whether the connection was closed
   */
  isConnectionClosed(): boolean;
}
