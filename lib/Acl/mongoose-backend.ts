import { Connection } from 'mongoose';
import { each as promiseEech } from 'bluebird';
import { Backend, AsyncFunc } from './interfaces';
export class MongooseBackend implements Backend {
  private _connection;
  private _prefix;
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
    return null;
  }
  unions(buckets: string[], keys: string[]): Promise<any> {
    return null;
  }
  union(bucket: string, keys: string[]): Promise<any> {
    return null;
  }
  add(transaction: AsyncFunc[], bucket: string, key: string, values: any[]) {}
  del(transaction: AsyncFunc[], bucket: string, keys: string[]) {}
  remove(
    transaction: AsyncFunc[],
    bucket: string,
    key: string,
    values: any[],
  ) {}
}
