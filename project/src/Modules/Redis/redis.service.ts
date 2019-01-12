import { Injectable, Inject } from '@nestjs/common';
import { compact } from 'lodash';
@Injectable()
export class RedisService {
  constructor(@Inject('RedisConnectionToken') private readonly redis) {}
  async set(
    key: string,
    value: string,
    command?: string,
    time?: number,
  ): Promise<string> {
    const args = [key, value, command, time];
    return new Promise((resolve, reject) => {
      this.redis.set(...compact(args), (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
  async get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
  async del(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.redis.del(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
}
