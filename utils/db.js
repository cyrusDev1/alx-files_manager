import { MongoClient } from 'mongodb';
import { env } from 'process';
import { createHash } from 'crypto';

class DBClient {
  constructor () {
    const host = env.DB_HOST ? env.DB_HOST : 'localhost';
    const port = env.DB_PORT ? env.DB_PORT : '27017';
    const dbName = env.DB_DATABASE ? env.DB_DATABASE : 'files_manager';
    const url = `mongodb://${host}:${port}/${dbName}`;
    this.client = MongoClient(url);
    this.client.connect();
  }

  isAlive () {
    return this.client.isConnected();
  }

  async nbUsers () {
    this.Mydb = this.client.db();
    const collection = this.Mydb.collection('users');
    return collection.countDocuments();
  }

  async nbFiles () {
    this.Mydb = this.client.db();
    const collection = this.Mydb.collection('files');
    return collection.countDocuments();
  }

  async chekEmail (email) {
    this.Mydb = this.client.db();
    const collection = this.Mydb.collection('users');
    return collection.findOne({ email });
  }

  async createNewUser (email, _password) {
    this.Mydb = this.client.db();
    const collection = this.Mydb.collection('users');
    const password = createHash('sha1').update(_password).digest('hex');
    return collection.insertOne({ email, password });
  }
}
const dbClient = new DBClient();
export default dbClient;
