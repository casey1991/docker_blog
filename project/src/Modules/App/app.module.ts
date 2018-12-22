import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from '../Cat/cat.module';
import { RedisModule } from '../Redis/redis.module';
import { FileModule } from '../File/file.module';
@Module({
  imports: [
    CatModule,
    RedisModule,
    FileModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { Upload: GraphQLUpload },
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
