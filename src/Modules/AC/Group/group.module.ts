import { Module } from '@nestjs/common';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';
import { DatabaseModule } from '../../Database/database.module';
import { PolicyModule } from '../Policy/policy.module';
import { groupProviders } from './group.providers';

@Module({
  imports: [DatabaseModule, PolicyModule],
  providers: [GroupService, GroupResolver, ...groupProviders],
  exports: [GroupService, GroupResolver],
})
export class GroupModule {}
