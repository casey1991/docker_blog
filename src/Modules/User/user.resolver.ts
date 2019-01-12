import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query()
  async user(@Args('id') id: string) {
    return await this.userService.findOne({ _id: id });
  }
  @Query('users')
  async users() {
    return await this.userService.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createUser')
  async createUser(@Args() user) {
    return await this.userService.create({ ...user });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('updateUser')
  async updateUser(@Args() user) {
    const { id, ...rest } = user;
    return await this.userService.update({ _id: id }, rest);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('deleteUser')
  async deleteUser(@Args('id') id) {
    return await this.userService.delete({ _id: id });
  }
}
