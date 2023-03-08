import redisClient from '../utils/redis';
import dbClient from '../utils/db';
class AppController {
  static async getStatus (request, response) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ redis, db }).end();
  }

  static async getStats (request, response) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    response.set('Content-Type', 'application/json');
    response.status(200).json({ users, files }).end();
  }
}
export default AppController;
