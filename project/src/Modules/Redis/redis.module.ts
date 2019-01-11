import { Module } from '@nestjs/common';
import { ConfigModule } from '../Config/config.module';
import { databaseProviders } from './redis.providers';
// http://redis.js.org
@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class RedisModule {}
