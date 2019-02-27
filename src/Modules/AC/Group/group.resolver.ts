import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { GroupService } from './group.service';
import { PolicyService } from '../Policy/policy.service';
@Resolver('Group')
export class GroupResolver {
  constructor(
    private readonly groupSerivce: GroupService,
    private readonly policyService: PolicyService,
  ) {}
  @Query()
  async group() {
    return await this.groupSerivce.findGroup({});
  }
  @Query('groups')
  async groups() {
    return await this.groupSerivce.findGroups({});
  }
  @ResolveProperty('users')
  async getUsers(@Parent() parent) {
    return null;
  }
  @ResolveProperty('policies')
  async getPolicies(@Parent() parent) {
    return await this.policyService.findPolicies({
      _id: { $in: parent.policies },
    });
  }
  @Mutation('createGroup')
  async createGroup(
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies,
  ) {
    return await this.groupSerivce.createGroup({ name, users, policies });
  }
  @Mutation('updateGroup')
  async updateGroup(
    @Args('id') id,
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies,
  ) {
    return await this.groupSerivce.updateGroup(
      { _id: id },
      { name, users, policies },
    );
  }
}
