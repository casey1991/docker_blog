import { Module } from '@nestjs/common';

import { QueueService } from './queue.service';
import { queueProviders } from './queue.providers';
import { RedisModule } from '../Redis/redis.module';
import { UserModule } from '../User/user.module';
import { QueueController } from './queue.controller';

@Module({
  imports: [RedisModule, UserModule],
  controllers: [QueueController],
  providers: [QueueService, ...queueProviders],
  exports: [QueueService],
})
export class QueueModule {}
