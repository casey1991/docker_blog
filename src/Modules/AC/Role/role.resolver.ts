import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { RoleService } from './role.service';
import { PolicyService } from '../Policy/policy.service';
@Resolver('Role')
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly policyService: PolicyService,
  ) {}
  @Query()
  async role() {
    return await this.roleService.findRole({});
  }
  @Query('roles')
  async roles() {
    return await this.roleService.findRoles({});
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
  @Mutation('createRole')
  async createRole(
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies,
  ) {
    return await this.roleService.createRole({ name, users, policies });
  }
  @Mutation('updateRole')
  async updateRole(
    @Args('id') id,
    @Args('name') name,
    @Args('users') users,
    @Args('policies') policies,
  ) {
    return await this.roleService.updateRole(
      { _id: id },
      { name, users, policies },
    );
  }
}
