import { Resolver, ResolveProperty } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
// graplql actions
import { Query, Mutation, Subscription } from '@nestjs/graphql';
import { Args, Parent } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// services
import { GoodsService } from './goods.service';
// guards
import { GqlAuthGuard } from '../../Common/Nest/Guards/graphql-auth.guard';
// decorators
import { User } from '../../Common/Nest/Decorators/graphql-user-context.decorator';
import { UserService } from '../User/user.service';

const pubSub = new PubSub();
@Resolver('Goods')
export class GoodsResolver {
  constructor(
    private readonly goodsService: GoodsService,
    private readonly userService: UserService,
  ) {}
  @Query('goods')
  async goods(@Args('id') id: string) {
    return await this.goodsService.findOne({ _id: id });
  }
  @Query('goodss')
  async goodss() {
    return await this.goodsService.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createGoods')
  async createGoods(@Args() goods, @User() user) {
    const result = await this.goodsService.create({
      ...goods,
      owner: user._id,
    });
    pubSub.publish('goodsCreated', { goodsCreated: result });
    return result;
  }
  @ResolveProperty('owner')
  async owner(@Parent() goods) {
    return this.userService.findOne({ _id: goods.owner });
  }
  @Subscription('goodsCreated')
  goodsCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('goodsCreated'),
    };
  }
  @Subscription('goodsUpdated')
  goodsUpdated() {
    return {
      subscribe: () => pubSub.asyncIterator('goodsCreated'),
    };
  }
}
