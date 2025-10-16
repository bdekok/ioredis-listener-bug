/// <reference types="node" />

import type { CacheClientInterface } from './types';

declare global {
  // noinspection ES6ConvertVarToLetConst
  var cacheClient: CacheClientInterface | undefined;
}

export {};
