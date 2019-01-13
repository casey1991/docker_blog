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
import { Message } from 'protobufjs';
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
    // return await this.chatService.findRoom({ _id: id });
  }
  @Query('messages')
  async messages(@Args('roomId') roomId: string) {
    // return await this.chatService.findRooms();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createMessage')
  async createMessage(@Args('roomId') roomId, @Args() message, @User() user) {
    const currentUser = user._id;
    Reflect.deleteProperty(message, 'roomId');
    Reflect.set(message, 'owner', currentUser);
    return await this.chatService.createMessage(roomId, message);
  }
}
