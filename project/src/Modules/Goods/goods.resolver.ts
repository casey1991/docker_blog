import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation, Subscription } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// services
import { GoodsService } from './goods.service';

const pubSub = new PubSub();
@Resolver('goods')
export class GoodsResolver {
  constructor(private readonly goodsService: GoodsService) {}
  @Query()
  async goods(@Args('id') id: string) {
    return await this.goodsService.findOne({ _id: id });
  }
  @Query('goodss')
  async goodss() {
    return await this.goodsService.findAll();
  }
  @Mutation('createGoods')
  async createGoods(@Args() goods) {
    const result = await this.goodsService.create({ ...goods });
    pubSub.publish('goodsCreated', result);
    return result;
  }
  @Subscription('goodsCreated')
  async goodsCreated() {
    return {
      subscribe: () => pubSub.asyncIterator('goodsCreated'),
    };
  }
  @Subscription('goodsUpdated')
  async goodsUpdated() {
    return {
      subscribe: () => pubSub.asyncIterator('goodsUpdated'),
    };
  }
}
