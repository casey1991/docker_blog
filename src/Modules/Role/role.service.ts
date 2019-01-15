import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(@Inject('ACLDbToken') private readonly acl: any) {}
  async addUserRoles() {}
}
