import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Role } from '../interfaces';
@Injectable()
export class RoleService {
  constructor(
    @Inject('RoleModelToken')
    private readonly roleModel: Model<Role>,
  ) {}
  async createRole(role: {}) {
    const cratedCat = new this.roleModel(role);
    return await cratedCat.save();
  }
  async updateRole(conditions: {}, update: {}) {
    return await this.roleModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async findRole(conditions: {}) {
    return await this.roleModel.findOne(conditions);
  }
  async findRoles(conditions: {}) {
    return await this.roleModel.find(conditions);
  }
}
