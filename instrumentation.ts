import {
  initCacheClient,
  register as registerCacheClient,
} from '@/cache-package';

export async function register() {
  const cacheClient = await initCacheClient();

  if (cacheClient) {
    console.log('Registering cache client...');
    await registerCacheClient({ cacheClient });
  }
}
