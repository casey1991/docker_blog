import { Module } from '@nestjs/common';

import { QueueService } from './queue.service';
import { queueProviders } from './queue.providers';
import { DatabaseModule } from '../Database/database.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [QueueService, ...queueProviders],
  exports: [QueueService],
})
export class QueueModule {}
