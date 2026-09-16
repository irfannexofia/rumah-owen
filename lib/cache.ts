type CacheItem<T> = {
  value: T;
  expiresAt: number;
};

const fiveMinutes = 5 * 60 * 1000;
const cache = new Map<string, CacheItem<unknown>>();

export function getCached<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    cache.delete(key);
    return null;
  }
  return item.value as T;
}

export function setCached<T>(key: string, value: T) {
  cache.set(key, { value, expiresAt: Date.now() + fiveMinutes });
}

export function invalidateCache(key?: string) {
  if (key) {
    cache.delete(key);
    return;
  }
  cache.clear();
}
