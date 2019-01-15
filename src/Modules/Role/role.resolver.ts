import { Resolver } from '@nestjs/graphql';

// services
import { RoleService } from './role.service';
@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}
}
