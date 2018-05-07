'use strict';

const expressRedisCache = require('express-redis-cache');
const cacheConfig = require('../config').cache;
const redis = require('../redis');
const logger = require('./logger');
const utils = require('../utils');

class Cache {
  cacheServer = expressRedisCache({ client: redis });

  enabled = true;

  defaultEntryDuration = '30 minutes';

  /**
   * Initialize cache
   * @param {Object} config - Cache configuration
   * @param {String} config.host - Host
   * @param {Number} config.port - Port
   * @param {Boolean} config.enabled - Redis enabled
   * @param {String} config.defaultEntryDuration - Time duration
   */
  setup(config) {
    this.cacheServer = expressRedisCache({
      host: config.host || 'localhost',
      port: config.port || 6379
    });
    this.enabled = typeof config.enabled === 'undefined'
      ? config.enabled
      : this.enabled;
    this.defaultEntryDuration = config.defaultEntryDuration || this.defaultEntryDuration;
  }

  /**
   * Get from cache if exits, otherwise store data
   * @param {String} duration
   */
  route(duration = this.defaultEntryDuration) {
    const seconds = utils.toMilliseconds(duration) / 1000;

    if (cacheConfig.enabled && cacheConfig.redis.enabled) {
      /**
       * Cache middleware
       */
      return (req, res, next) => {
        const name = `${req.session.microsite}-${req.originalUrl}`;

        return this.cacheServer.get(name, (err, entries) => {
          if (err) {
            return logger.error(err);
          }

          // If it's cached, display cache
          if (entries.length > 0) {
            res.contentType(entries[0].type || 'text/html');
            res.send(entries[0].body);
            return;
          }

          // Otherwise, cache request
          let send = res.send.bind(res);

          // Wrap: res.send
          res.send = (body) => {
            let ret = send(body);

            // Convert binary to base64 string
            if (typeof body !== 'string') {
              body = new Buffer(body).toString('base64');
            }

            // Save only strings to cache
            if (typeof body !== 'string') {
              return ret;
            }

            // Options for cache
            let options = {
              type: 'json', // Content-Type
              expire: seconds // Lifetime of entry in seconds
            };

            // Create the new cache
            if ((res.statusCode === 200 || res.statusCode === 304) && typeof body.error === 'undefined') {
              this.cacheServer.add(name, body, options, (error, added) => {
                if (error) {
                  return logger.error(error);
                }
                return null;
              });
            }
            return ret;
          };
          return next();
        });
      };
    }
    return (req, res, next) => next();
  }
};

module.exports = Cache;
