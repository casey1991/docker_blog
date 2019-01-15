import { Controller, Get, Inject } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  async hei() {
    return this.roleService.addUserRoles();
  }
}
