import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveProperty,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { hasIn } from 'lodash';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PubSub, withFilter } from 'graphql-subscriptions';
// services
import { ChatService } from './chat.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../../Common/Nest/Guards/graphql-auth.guard';
// decorators
import { User } from '../../Common/Nest/Decorators/graphql-user-context.decorator';
import { Message } from './Interfaces/message.interface';

const pubSub = new PubSub();
@Resolver('Message')
export class MessageResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  @Query()
  // queries
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
  @ResolveProperty('owner')
  async getOwner(@Parent() parent: Message) {
    const userId = parent.owner;
    return await this.userService.findOne({ _id: userId });
  }
  // mutations
  @UseGuards(GqlAuthGuard)
  @Mutation('createMessage')
  async createMessage(@Args('roomId') roomId, @Args() message, @User() user) {
    const currentUser = user._id;
    Reflect.deleteProperty(message, 'roomId');
    Reflect.set(message, 'owner', currentUser);
    Reflect.set(message, 'room', roomId);
    const createdMessage = await this.chatService.createMessage(message);
    pubSub.publish('messageCreated', { messageCreated: createdMessage });
    return createdMessage;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('updateMessage')
  async updateMessage(
    @Args('messageId') messageId,
    @Args() message,
    @User() user,
  ) {
    const currentUser = user._id;
    const updatedMessage = await this.chatService.updateMessage(
      { _id: messageId, owner: currentUser },
      message,
    );
    pubSub.publish('messageUpdated', { messageUpdated: updatedMessage });
    return updatedMessage;
  }
  // subscriptions
  @Subscription('messageCreated')
  messageCreated() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator('messageCreated'),
        (rootValue?: any, args?: any) => {
          const { roomId } = args;
          const messageRoom = hasIn(rootValue, 'messageCreated.room')
            ? rootValue.messageCreated.room
            : null;
          if (messageRoom.equals(roomId)) {
            return true;
          }
          return false;
        },
      ),
    };
  }
  @Subscription('messageUpdated')
  messageUpdated() {
    return {
      subscribe: withFilter(
        () => pubSub.asyncIterator('messageUpdated'),
        (rootValue?: any, args?: any) => {
          const { roomId } = args;
          const messageRoom = hasIn(rootValue, 'messageUpdated.room')
            ? rootValue.messageUpdated.room
            : null;
          if (messageRoom.equals(roomId)) {
            return true;
          }
          return false;
        },
      ),
    };
  }
}
