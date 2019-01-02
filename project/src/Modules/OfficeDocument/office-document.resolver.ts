import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { OfficeDocumentService } from './office-document.service';
@Resolver('OfficeDocument')
export class OfficeDocumentResolver {
  constructor(private readonly officeDocumentService: OfficeDocumentService) {}
  @Query('officeDocument')
  async cat(@Args('id') id: string) {
    return await this.officeDocumentService.findOne({ _id: id });
  }
  @Query('officeDocuments')
  async cats() {
    return await this.officeDocumentService.findAll();
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
