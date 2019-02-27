import { Module } from '@nestjs/common';
import { ACService } from './ac.service';
import { DatabaseModule } from '../Database/database.module';
import { GroupModule } from './Group/group.module';
import { PolicyModule } from './Policy/policy.module';
import { acProviders } from './ac.providers';

@Module({
  imports: [DatabaseModule, GroupModule, PolicyModule],
  providers: [ACService, ...acProviders],
  exports: [ACService, ...acProviders, GroupModule, PolicyModule],
})
export class ACModule {}
