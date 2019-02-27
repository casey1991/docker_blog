import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PolicyService } from './policy.service';
@Resolver('Policy')
export class PolicyResolver {
  constructor(private readonly policyService: PolicyService) {}
  @Query()
  async policy() {
    return await this.policyService.findPolicy({});
  }
  @Query('policies')
  async policies() {
    return await this.policyService.findPolicies({});
  }
  @Mutation('createPolicy')
  async createPolicy(@Args('resource') resource, @Args('action') action) {
    return await this.policyService.createPolicy({ resource, action });
  }
  @Mutation('updatePolicy')
  async updatePolicy(
    @Args('id') id,
    @Args('resource') resource,
    @Args('action') action,
  ) {
    return await this.policyService.updatePolicy(
      { _id: id },
      { resource, action },
    );
  }
}
