import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CatsModule} from '../Cats/cats.module'
import {RedisModule} from '../Redis/redis.module'

@Module({
  imports: [CatsModule,RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
