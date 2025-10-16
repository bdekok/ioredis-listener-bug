import type { RegisterOptions } from './types/types';

export async function register({ cacheClient }: RegisterOptions) {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }
  const { setCacheClient } = await import(
    './server/client/CacheClientRepository'
  );

  setCacheClient(cacheClient);
}
