import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { User } from './Interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModelToken')
    private readonly usertModel: Model<User>,
  ) {}
  async findOne(conditions: {}): Promise<User> {
    return await this.usertModel.findOne(conditions);
  }
  async create(cat: {}): Promise<User> {
    const cratedCat = new this.usertModel(cat);
    return await cratedCat.save();
  }
  async update(conditions: {}, update: {}): Promise<User> {
    return await this.usertModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async delete(conditions: {}) {
    return await this.usertModel.findOneAndRemove(conditions);
  }
  async deleteMany(conditions: {}) {
    return await this.usertModel.deleteMany(conditions);
  }
  async findAll(): Promise<User[]> {
    return await this.usertModel.find().exec();
  }
}
