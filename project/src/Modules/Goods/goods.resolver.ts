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
  // @Mutation('createDocument')
  // async createCat(@Args() cat) {
  //   return await this.officeDocumentService.create({ ...cat });
  // }
  // @Mutation('updateDocument')
  // async updateCat(@Args() cat) {
  //   const { id, ...rest } = cat;
  //   return await this.officeDocumentService.update({ _id: id }, rest);
  // }
  // @Mutation('deleteDocument')
  // async deleteCat(@Args('id') id) {
  //   return await this.officeDocumentService.delete({ _id: id });
  // }
}
