import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { chatProviders } from './chat.providers';
import { DatabaseModule } from '../Database/database.module';
import { ChatResolver } from './chat.resolver';
import { UserModule } from '../User/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ChatService, ...chatProviders, ChatResolver],
  exports: [ChatService],
})
export class ChatModule {}
