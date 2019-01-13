import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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

// scalars
import { EmailAddress as Email, DateTime as Date } from './Common/Scalars';
@Module({
  imports: [
    AuthModule,
    UserModule,
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
      debug: true,
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
