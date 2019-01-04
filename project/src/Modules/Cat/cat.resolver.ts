import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { CatService } from './cat.service';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
// decorators
import { User } from '../Auth/graphql-user-context.decorator';
@Resolver('Cat')
export class CatResolver {
  constructor(private readonly catService: CatService) {}
  @Query()
  async cat(@Args('id') id: string) {
    return await this.catService.findOne({ _id: id });
  }
  @Query('cats')
  async cats() {
    return await this.catService.findAll();
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('createCat')
  async createCat(@Args() cat, @User() user) {
    return await this.catService.create({ ...cat, owner: user._id });
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('updateCat')
  async updateCat(@Args() cat) {
    const { id, ...rest } = cat;
    return await this.catService.update({ _id: id }, rest);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation('deleteCat')
  async deleteCat(@Args('id') id) {
    return await this.catService.delete({ _id: id });
  }
}
