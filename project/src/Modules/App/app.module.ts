import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from '../Cats/cats.module';
import { RedisModule } from '../Redis/redis.module';
import { FileModule } from '../File/file.module';
@Module({
  imports: [
    CatsModule,
    RedisModule,
    FileModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
