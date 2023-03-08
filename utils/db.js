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

  async filterUser(filters) {
    const myDB = this.myClient.db();
    const myCollection = myDB.collection('users');
    if ('_id' in filters) {
      // eslint-disable-next-line no-param-reassign
      filters._id = ObjectId(filters._id);
    }
    return myCollection.findOne(filters);
  }

  async filterFiles(filters) {
    const myDB = this.myClient.db();
    const myCollection = myDB.collection('files');
    const idFilters = ['_id', 'userId', 'parentId'].filter((prop) => prop in filters && filters[prop] !== '0');
    idFilters.forEach((i) => {
      // eslint-disable-next-line no-param-reassign
      filters[i] = ObjectId(filters[i]);
    });
    return myCollection.findOne(filters);
  }
}
const dbClient = new DBClient();
export default dbClient;
