import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor () {
    this.client = createClient();
    this.client.on('error', (error) => { console.log(error); });
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  async set (key, value, time) {
    const setAsync = promisify(this.client.set).bind(this.client);
    return setAsync(key, value, 'EX', time);
  }

  async del (key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
