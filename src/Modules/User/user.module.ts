import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../Database/database.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders, UserResolver],
  exports: [UserService],
})
export class UserModule {}
