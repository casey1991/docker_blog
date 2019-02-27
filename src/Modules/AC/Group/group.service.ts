import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Group, Policy } from '../interfaces';
@Injectable()
export class GroupService {
  constructor(
    @Inject('GroupModelToken')
    private readonly groupModule: Model<Group>,
  ) {}
  async createGroup(group: {}) {
    const cratedCat = new this.groupModule(group);
    return await cratedCat.save();
  }
  async updateGroup(conditions: {}, update: {}) {
    return await this.groupModule.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async findGroup(conditions: {}) {
    return await this.groupModule.findOne(conditions);
  }
  async findGroups(conditions: {}) {
    return await this.groupModule.find(conditions);
  }
}
