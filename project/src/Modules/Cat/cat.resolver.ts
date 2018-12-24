import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { CatService } from './cat.service';
@Resolver('Cat')
export class CatResolver {
  constructor(private readonly catService: CatService) {}
  @Query()
  async cat(@Args('id') id: string) {
    // return await this.catsService.findAll;
  }
  @Query('cats')
  async cats() {
    return await this.catService.findAll();
  }
  @Mutation('createCat')
  async createCat(@Args() cat) {
    return await this.catService.create({ ...cat });
  }
  @Mutation('updateCat')
  async updateCat(@Args() cat) {
    const { id, ...rest } = cat;
    return await this.catService.update({ _id: id }, rest);
  }
  @Mutation('deleteCat')
  async deleteCat(@Args('id') id) {
    return await this.catService.delete({ _id: id });
  }
}
