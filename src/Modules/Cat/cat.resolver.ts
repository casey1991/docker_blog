import { UseGuards } from '@nestjs/common';
import { Resolver, ResolveProperty, Parent } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { CatService } from './cat.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../../Common/Nest/Guards/graphql-auth.guard';
// decorators
import { User } from '../../Common/Nest/Decorators/graphql-user-context.decorator';
@Resolver('Cat')
export class CatResolver {
  constructor(
    private readonly catService: CatService,
    private readonly userService: UserService,
  ) {}
  @Query()
  async cat(@Args('id') id: string) {
    return await this.catService.findOne({ _id: id });
  }
  @Query('cats')
  async cats() {
    return await this.catService.findAll();
  }
  @ResolveProperty('owner')
  async owner(@Parent() cat) {
    return await this.userService.findOne({ _id: cat.owner });
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
