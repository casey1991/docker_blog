import { AsyncFunc } from './async.interface';
export interface Backend {
  begin(): AsyncFunc[];
  end(transaction: AsyncFunc[]): Promise<boolean>;
  clean(): Promise<any>;
  get(bucket: string, key: string): Promise<any[]>;
  unions(buckets: string[], keys: string[]): Promise<any>;
  union(bucket: string, keys: string[]): Promise<any>;
  add(transaction: AsyncFunc[], bucket: string, key: string, values: any[]);
  del(transaction: AsyncFunc[], bucket: string, keys: string[]);
  remove(transaction: AsyncFunc[], bucket: string, key: string, values: any[]);
}
