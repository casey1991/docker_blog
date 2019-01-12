import { Module } from '@nestjs/common';

import { GoodsService } from './goods.service';
import { goodsProviders } from './goods.providers';
import { DatabaseModule } from '../Database/database.module';
import { GoodsResolver } from './goods.resolver';
import { UserModule } from '../User/user.module';
@Module({
  imports: [DatabaseModule, UserModule],
  providers: [GoodsService, ...goodsProviders, GoodsResolver],
  exports: [GoodsService],
})
export class GoodsModule {}
