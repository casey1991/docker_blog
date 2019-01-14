import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { ChatService } from './chat.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
// decorators
import { User } from '../Auth/graphql-user-context.decorator';
import { Message } from './Interfaces/message.interface';
@Resolver('Message')
export class MessageResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  @Query()
  async message(
    @Args('roomId') roomId: string,
    @Args('messageId') messageId: string,
  ) {
    const query = { _id: messageId };
    return await this.chatService.findMessage(roomId, query);
  }
  @Query('messages')
  async messages(@Args('roomId') roomId: string) {
    return await this.chatService.findMessages(roomId, {});
  }
  @ResolveProperty('room')
  async getRoom(@Parent() parent: Message) {
    const roomId = parent.room;
    return await this.chatService.findRoom({ _id: roomId });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createMessage')
  async createMessage(@Args('roomId') roomId, @Args() message, @User() user) {
    const currentUser = user._id;
    Reflect.deleteProperty(message, 'roomId');
    Reflect.set(message, 'owner', currentUser);
    Reflect.set(message, 'room', roomId);
    return await this.chatService.createMessage(message);
  }
}
