import { Connection } from 'mongoose';
import { Backend, AsyncFunc } from './interfaces';
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
  async end(transaction: AsyncFunc[]): Promise<boolean> {
    return null;
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
  add(transaction: AsyncFunc[], bucket: string, key: string, values: any[]) {
    return null;
  }
  del(transaction: AsyncFunc[], bucket: string, keys: string[]) {}
  remove(
    transaction: AsyncFunc[],
    bucket: string,
    key: string,
    values: any[],
  ) {}
}
