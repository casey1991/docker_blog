export interface Backend {
  begin(): Function[];
  end(transaction: Function[]): Promise<Boolean>;
  clean(): Promise<any>;
  get(bucket: string, key: string): Promise<any[]>;
  unions(buckets: string[], keys: string[]): Promise<any>;
  union(bucket: string, keys: string[]): Promise<any>;
  add(transaction: Function[], bucket: string, key: string, values: any[]);
  del(transaction: Function[], bucket: string, keys: string[]);
  remove(transaction: Function[], bucket: string, key: string, values: any[]);
}
