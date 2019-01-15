import { union, forEach, difference } from 'lodash';
import { Backend } from './backend.interface';
export class MemoryBackend implements Backend {
  private readonly _buckets = {};
  async begin(): Promise<any[]> {
    return [];
  }
  async end(transaction: any[]): Promise<any> {
    forEach(transaction, item => {
      item();
    });
    return null;
  }
  async clean(): Promise<any> {
    return null;
  }
  async get(bucket, key): Promise<any> {
    if (this._buckets[bucket]) return this._buckets[bucket][key] || [];
    return [];
  }
  async unions(): Promise<any> {
    return null;
  }
  async union(): Promise<any> {
    return null;
  }
  async add(transaction: any[], bucket: string, key: string, values: any[]) {
    transaction.push(() => {
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
  async del(): Promise<any> {
    return null;
  }
  async remove(transaction: any[], bucket: string, key: string, values: any[]) {
    transaction.push(() => {
      let old;
      if (this._buckets[bucket] && (old = this._buckets[bucket][key])) {
        this._buckets[bucket][key] = difference(old, values);
      }
    });
  }
}
