export interface Backend {
  begin(): Promise<any[]>;
  end(transaction: any[]): Promise<any>;
  clean(): Promise<any>;
  get(bucket: string, key: string): Promise<any[]>;
  unions(): Promise<any>;
  union(): Promise<any>;
  add(transaction: any[], bucket: string, key: string, values: any[]);
  del(transaction: any[], bucket: string, key: string): Promise<any>;
  remove(transaction: any[], bucket: string, key: string, values: any[]);
}
