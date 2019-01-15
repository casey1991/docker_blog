import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { roleProviders } from './role.providers';
import { UserModule } from '../User/user.module';
// resolvers
import { RoleResolver } from './role.resolver';
import { RoleController } from './role.controller';
import { RedisModule } from '../Redis/redis.module';

@Module({
  imports: [RedisModule, UserModule],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
