import { Module } from '@nestjs/common';

// modules
import { RedisModule } from '../Redis/redis.module';
import { ConfigModule } from '../Config/config.module';
// services
import { PremiumQueueService } from './premium-queue.service';
// providers
import { premiumQueueProviders } from './premium-queue.providers';

import { PremiumQueueResolver } from './premium-queue.resolver';

@Module({
  imports: [ConfigModule, RedisModule],
  providers: [
    PremiumQueueService,
    ...premiumQueueProviders,
    PremiumQueueResolver,
  ],
  exports: [PremiumQueueService],
})
export class PremiumQueueModule {}
