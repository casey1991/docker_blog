import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

@Resolver('File')
export class FileResolver {
  @Query()
  async cat(@Args('id') id: string) {
    // return await this.catsService.findAll;
    return {};
  }
  @Query('cats')
  async cats() {
    return [];
  }
  @Mutation('createFile')
  async createFile() {}
}
