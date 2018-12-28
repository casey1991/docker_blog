import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ThrowStatement } from 'ts-simple-ast';

export class ConfigService {
  private readonly envConfig: {
    [key: string]: string;
  };
  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
