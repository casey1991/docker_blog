import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { CatsService } from './cats.service';
@Resolver('Cat')
export class CatResolver {
  constructor(private readonly catsService: CatsService) {}
  @Query()
  async cat(@Args('id') id: string) {
    // return await this.catsService.findAll;
  }
  @Query('cats')
  async cats() {
    return await this.catsService.findAll();
  }
  @Mutation('createCat')
  async createCat(@Args() cat) {
    return await this.catsService.create({ ...cat });
  }
  @Mutation('deleteCat')
  async deleteCat(@Args('id') id) {
    return await this.catsService.delete({ _id: id });
  }
}
