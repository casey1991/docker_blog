import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveProperty,
  Parent,
  Subscription,
} from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// services
import { ChatService } from './chat.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
// decorators
import { User } from '../Auth/graphql-user-context.decorator';

const pubSub = new PubSub();
@Resolver('Room')
export class RoomResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  // queries
  @Query()
  async room(@Args('id') id: string) {
    return await this.chatService.findRoom({ _id: id });
  }
  @Query('rooms')
  async rooms() {
    return await this.chatService.findRooms();
  }
  @ResolveProperty('users')
  async users(@Parent() parent) {
    const users = parent.users || [];
    return await this.userService.findAll({ _id: { $in: users } });
  }
  @ResolveProperty('messages')
  async messages(@Parent() parent) {
    const roomId = parent._id;
    return await this.chatService.findMessages(roomId, {});
  }
  // mutations
  @UseGuards(GqlAuthGuard)
  @Mutation('createRoom')
  async createRoom(@Args() room, @User() user) {
    const currentUser = user._id;
    const createdRoom = await this.chatService.createRoom({
      ...room,
      users: [currentUser],
    });
    pubSub.publish('roomCreated', { roomCreated: createdRoom });
    return createdRoom;
  }
  // subscriptions
  @Subscription('roomCreated')
  roomCreated() {
    return { subscribe: () => pubSub.asyncIterator('roomCreated') };
  }
  @Subscription('roomUpdated')
  roomUpdated() {
    return { subscribe: () => pubSub.asyncIterator('roomUpdated') };
  }
}
