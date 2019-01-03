import { Module } from '@nestjs/common';

import { GoodsService } from './goods.service';
import { goodsProviders } from './goods.providers';
import { DatabaseModule } from '../Database/database.module';
import { GoodsResolver } from './goods.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [GoodsService, ...goodsProviders, GoodsResolver],
})
export class GoodsModule {}
