'use strict';

const redis = require('redis');
const bluebird = require('bluebird');
const config = require('./config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  port: config.cache.port,
  host: config.cache.host
});

client.on('error', err => console.log(err));

module.exports = client;
