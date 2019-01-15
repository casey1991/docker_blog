import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Room } from './Interfaces/room.interface';
import { Message } from './Interfaces/message.interface';

@Injectable()
export class RoleService {
  constructor(@Inject('ACLDbToken') private readonly acl: any) {}
  async addUserRoles() {
    this.acl.addUserRoles('casey', 'admin');
    const result = await this.acl.userRoles('casey');
    console.log(result);
  }
}
