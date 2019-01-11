import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@Inject('RedisConnectionToken') private readonly redis) {}
  async set(
    key: string,
    value: string,
    command: string,
    time: number,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redis.set(key, value, command, time, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
  async get(key: string) {
    return new Promise((resolve, reject) => {
      this.redis.get(key, (error, value) => {
        if (error) reject(error);
        resolve(value);
      });
    });
  }
}
