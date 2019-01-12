import { Module } from '@nestjs/common';

import { CatService } from './cat.service';
import { catProviders } from './cat.providers';
import { DatabaseModule } from '../Database/database.module';
import { CatResolver } from './cat.resolver';
import { UserModule } from '../User/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [CatService, ...catProviders, CatResolver],
  exports: [CatService],
})
export class CatModule {}
