import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import { DatabaseModule } from '../../Database/database.module';
import { PolicyModule } from '../Policy/policy.module';
import { roleProviders } from './role.providers';

@Module({
  imports: [DatabaseModule, PolicyModule],
  providers: [RoleService, RoleResolver, ...roleProviders],
  exports: [RoleService, RoleResolver],
})
export class RoleModule {}
