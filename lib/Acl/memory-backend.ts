import { Promise as BlueBirdPromise } from 'bluebird';
import { union, difference, forEach } from 'lodash';
import { Backend } from './backend.interface';
export class MemoryBackend implements Backend {
  private _buckets = {};
  begin(): Function[] {
    return [];
  }
  async end(transaction: Function[]): Promise<any> {
    const result = await BlueBirdPromise.each(transaction, func => func());
    return result;
  }
  async clean(): Promise<Boolean> {
    this._buckets = {};
    return true;
  }
  async get(bucket: string, key: string): Promise<any> {
    if (this._buckets[bucket]) return this._buckets[bucket][key] || [];
    return [];
  }
  async unions(buckets: string[], keys: string[]): Promise<any> {
    return null;
  }
  async union(bucket: string, keys: string[]): Promise<any> {
    return null;
  }
  async add(
    transaction: Function[],
    bucket: string,
    key: string,
    values: any[],
  ) {
    transaction.push(async () => {
      if (!this._buckets[bucket]) {
        this._buckets[bucket] = {};
      }
      if (!this._buckets[bucket][key]) {
        this._buckets[bucket][key] = values;
      } else {
        this._buckets[bucket][key] = union(values, this._buckets[bucket][key]);
      }
    });
  }
  async del(transaction: Function[], bucket: string, keys: string[]) {
    transaction.push(async () => {
      if (this._buckets[bucket]) {
        forEach(keys, key => {
          Reflect.deleteProperty(this._buckets, this._buckets[bucket][key]);
        });
      }
    });
  }
  async remove(
    transaction: Function[],
    bucket: string,
    key: string,
    values: any[],
  ) {
    transaction.push(async () => {
      let old;
      if (this._buckets[bucket] && (old = this._buckets[bucket][key])) {
        this._buckets[bucket][key] = difference(old, values);
      }
    });
  }
}
