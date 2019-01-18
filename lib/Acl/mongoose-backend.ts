import { Connection } from 'mongoose';
import { each as promiseEech } from 'bluebird';
import { forEach } from 'lodash';
import { Backend, AsyncFunc } from './interfaces';
import { removeUnsupportedChar } from './utils';
export class MongooseBackend implements Backend {
  private _connection: Connection;
  private _prefix: string;
  constructor(connection: Connection, prefix: string) {
    this._connection = connection;
    this._prefix = prefix;
  }
  begin(): AsyncFunc[] {
    return [];
  }
  async end(transaction: AsyncFunc[]): Promise<Boolean> {
    const result = await promiseEech(transaction, func => func());
    return true;
  }
  clean(): Promise<any> {
    return null;
  }
  get(bucket: string, key: string): Promise<any[]> {
    // return null;
    const collection = this._connection.collection(
      this._prefix + removeUnsupportedChar(bucket),
    );
    const conditions = { key: key };
    return collection.findOne(conditions);
  }
  unions(buckets: string[], keys: string[]): Promise<any> {
    return null;
  }
  union(bucket: string, keys: string[]): Promise<any> {
    return null;
  }
  add(transaction: AsyncFunc[], bucket: string, key: string, values: any[]) {
    const conditions = { key: key };
    const collection = this._connection.collection(
      this._prefix + removeUnsupportedChar(bucket),
    );
    let columns = {};
    forEach(values, value => {
      columns[value] = true;
    });
    transaction.push(async () => {
      collection.update(conditions, { $set: columns }, { upsert: true });
    });
  }
  del(transaction: AsyncFunc[], bucket: string, keys: string[]) {}
  remove(
    transaction: AsyncFunc[],
    bucket: string,
    key: string,
    values: any[],
  ) {}
}
