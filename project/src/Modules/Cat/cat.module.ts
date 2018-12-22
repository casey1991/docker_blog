import { Module } from '@nestjs/common';

import { CatService } from './cat.service';
import { catProviders } from './cat.providers';
import { DatabaseModule } from '../Database/database.module';
import { CatResolver } from './cat.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [CatService, ...catProviders, CatResolver],
})
export class CatModule {}
