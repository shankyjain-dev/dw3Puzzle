const CatboxMemory = require('@hapi/catbox-memory');
/**
 * Hapi server config
 */
export const config = {
  port: 3333,
  cache: [
    {
      name: 'my_cache',
      provider: {
        constructor: CatboxMemory
      }
    }
  ],
  host: 'localhost',
  routes: {
    cors: true
  }
};

/**
 * Cache config
 */
export const cache_config = {
  cache: {
    cache: 'my_cache',
    expiresIn: 10 * 1000,
    generateTimeout: 20000,
    getDecoratedValue: true
  }
};