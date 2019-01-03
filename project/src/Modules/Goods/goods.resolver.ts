import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { GoodsService } from './goods.service';
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
    return await this.goodsService.create({ ...goods });
  }
}
