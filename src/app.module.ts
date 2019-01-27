import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// modules
import { AuthModule } from './Modules/Auth/auth.module';
import { UserModule } from './Modules/User/user.module';
import { GoodsModule } from './Modules/Goods/goods.module';
import { CatModule } from './Modules/Cat/cat.module';
import { RedisModule } from './Modules/Redis/redis.module';
import { PremiumQueueModule } from './Modules/PremiumQueue/premium-queue.module';
import { FileModule } from './Modules/File/file.module';
import { NoteModule } from './Modules/Note/note.module';
import { ChatModule } from './Modules/Chat/chat.module';
import { ACLMiddleware } from './Common/Nest/Middlewares/acl.middleware';
// scalars
import { Email, Date } from './Common/Graphql/Scalars';
import { RoleModule } from './Modules/Role/role.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    ChatModule,
    GoodsModule,
    NoteModule,
    CatModule,
    RedisModule,
    PremiumQueueModule,
    FileModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { Upload: GraphQLUpload, Email, Date },
      installSubscriptionHandlers: true,
      context: ({ req }: any) => ({ req }),
      transformSchema: (schema: GraphQLSchema) => {
        return schema;
      },
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ACLMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
