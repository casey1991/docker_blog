import { Module } from '@nestjs/common';
import { ConfigModule } from '../Config/config.module';
import { databaseProviders } from './redis.providers';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
// http://redis.js.org
@Module({
  imports: [ConfigModule],
  controllers: [RedisController],
  providers: [...databaseProviders, RedisService],
  exports: [...databaseProviders, RedisService],
})
export class RedisModule {}
