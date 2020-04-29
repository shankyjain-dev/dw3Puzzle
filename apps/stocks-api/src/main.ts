/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
'use strict';
import { config, cache_config } from '../../stocks-api/src/config/hapi-config';
import { Stocks } from '../src/app/model/stocks';
import { STOCKS_CONSTANTS } from '../src/app/stocks-api-constants'
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server(config);
  server.method('fetchStockData', Stocks.fetchQuotes, cache_config);

  server.route({
    method: 'GET',
    path: STOCKS_CONSTANTS.ROUTE,
    handler: async (request, h) => {
      const { stockSymbol, duration } = request.params;
      const { value, cached } = await server.methods.fetchStockData(stockSymbol, duration);
      const lastModified = cached ? new Date(cached.stored) : new Date();
      return h.response(value).header('Last-modified', lastModified.toUTCString());
    }
  });

  await server.start().then(() => {
    console.log('Server running on %s', server.info.uri);
  }).catch((error) => {
    console.log('Server failed to start', error);
  });
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
