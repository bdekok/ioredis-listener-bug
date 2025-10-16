import type Redis from 'ioredis';

import type { CacheClientInterface } from '../../types/types';

const printError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export default class RedisCacheClient implements CacheClientInterface {
  public constructor(
    private readonly client: Pick<Redis, 'get' | 'set' | 'del' | 'status'>
  ) {}

  public async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      throw new Error(
        `An error occurred getting a value from redis: ${printError(error)}`
      );
    }
  }

  public async set(
    key: string,
    value: string,
    ttlSeconds: number
  ): Promise<void> {
    if (ttlSeconds === 0) {
      throw new Error(
        `A time to live (TTL) of 0 seconds is not allowed for redis`
      );
    }

    if (ttlSeconds < 0) {
      throw new Error(`A negative time to live (TTL) is not allowed for redis`);
    }

    try {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } catch (error) {
      throw new Error(
        `An error occurred setting a value in redis: ${printError(error)}`
      );
    }
  }

  public async delete(key: string): Promise<boolean> {
    try {
      const affectedRecords = await this.client.del(key);

      return affectedRecords === 1;
    } catch (error) {
      throw new Error(
        `An error occurred deleting a value from redis: ${printError(error)}`
      );
    }
  }

  public isConnectionClosed(): boolean {
    return ['close', 'end'].includes(this.client.status);
  }
}
