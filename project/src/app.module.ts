import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// modules
import { AuthModule } from './Modules/Auth/auth.module';
import { UserModule } from './Modules/User/user.module';
import { OfficeDocumentModule } from './Modules/OfficeDocument/office-document.module';
import { CatModule } from './Modules/Cat/cat.module';
import { RedisModule } from './Modules/Redis/redis.module';
import { FileModule } from './Modules/File/file.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    OfficeDocumentModule,
    CatModule,
    RedisModule,
    FileModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { Upload: GraphQLUpload },
      context: ({ req }: any) => ({ req }),
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
