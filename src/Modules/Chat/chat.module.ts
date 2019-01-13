import { Module } from '@nestjs/common';

import { ChatService } from './chat.service';
import { chatProviders } from './chat.providers';
import { DatabaseModule } from '../Database/database.module';
import { UserModule } from '../User/user.module';
// resolvers
import { MessageResolver } from './message.resolver';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ChatService, ...chatProviders, RoomResolver, MessageResolver],
  exports: [ChatService],
})
export class ChatModule {}
