import { Module } from '@nestjs/common';
import { PolicyResolver } from './policy.resolver';
import { PolicyService } from './policy.service';
import { DatabaseModule } from '../../Database/database.module';
import { policyProviders } from './policy.providers';

@Module({
  imports: [DatabaseModule],
  providers: [PolicyResolver, PolicyService, ...policyProviders],
  exports: [PolicyResolver, PolicyService],
})
export class PolicyModule {}
