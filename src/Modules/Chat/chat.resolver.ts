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
@Resolver('Chat')
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}
  @Query()
  async cat(@Args('id') id: string) {
    return await this.chatService.findRoom({ _id: id });
  }
  @Query('rooms')
  async cats() {
    return await this.chatService.findRooms();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createRoom')
  async createRoom(@Args() cat, @User() user) {
    return await this.chatService.createRoom({ ...cat, owner: user._id });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createMessage')
  async createMessage(@Args() cat) {
    const { id, ...rest } = cat;
    return await this.chatService.updateRoom({ _id: id }, rest);
  }
}
