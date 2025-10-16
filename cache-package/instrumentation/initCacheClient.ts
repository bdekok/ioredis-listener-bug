import RedisCacheClient from '../server/client/RedisCacheClient';
import type { CacheClientInterface, CacheClientOptions } from '../types/types';

export const initCacheClient = async ({
  endpoint = process.env.CACHE_ENDPOINT as string | undefined,
  redisOptions,
}: CacheClientOptions = {}): Promise<CacheClientInterface | undefined> => {
  console.log('Initializing cache client with endpoint:', endpoint);
  if (process.env.NEXT_RUNTIME !== 'nodejs' || !endpoint) {
    return undefined;
  }

  // Dynamic import to ensure we only import it in the 'nodejs' environment
  const { default: Redis } = await import('ioredis');

  const client = new Redis(endpoint, {
    commandTimeout: 1_000,
    connectTimeout: 10_000,
    keepAlive: 10_000,
    retryStrategy(times: number): number | null {
      // Delay every retry
      if (times <= 10) {
        return Math.min(times * 100);
      }

      return null;
    },
    reconnectOnError: (): boolean | 1 | 2 => 2, // Reconnect after error and resend command
    ...redisOptions,
  });

  return new RedisCacheClient(client);
};
