import { Module } from '@nestjs/common';
import { ACService } from './ac.service';
import { DatabaseModule } from '../Database/database.module';
import { RoleModule } from './Role/role.module';
import { PolicyModule } from './Policy/policy.module';
import { acProviders } from './ac.providers';

@Module({
  imports: [DatabaseModule, RoleModule, PolicyModule],
  providers: [ACService, ...acProviders],
  exports: [ACService, ...acProviders, RoleModule, PolicyModule],
})
export class ACModule {}
