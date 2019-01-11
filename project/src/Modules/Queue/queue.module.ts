import { Module } from '@nestjs/common';

// modules
import { RedisModule } from '../Redis/redis.module';
import { ConfigModule } from '../Config/config.module';
// services
import { QueueService } from './queue.service';
// providers
import { queueProviders } from './queue.providers';

import { QueueResolver } from './queue.resolver';

@Module({
  imports: [ConfigModule, RedisModule],
  providers: [QueueService, ...queueProviders, QueueResolver],
  exports: [QueueService],
})
export class QueueModule {}
