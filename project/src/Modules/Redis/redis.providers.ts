import * as Redis from 'redis';
import { ConfigService } from '../Config/config.service';
export const databaseProviders = [
  {
    provide: 'RedisConnectionToken',
    useFactory: async (config: ConfigService) =>
      await Redis.createClient({
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
      }),
    inject: [ConfigService],
  },
];
