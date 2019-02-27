import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Policy } from '../interfaces';
@Injectable()
export class PolicyService {
  constructor(
    @Inject('PolicyModelToken')
    private readonly policyModel: Model<Policy>,
  ) {}
  async createPolicy(policy: {}) {
    const doc = new this.policyModel(policy);
    return await doc.save();
  }
  async updatePolicy(conditions: {}, update: {}) {
    return await this.policyModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async findPolicy(conditions: {}) {
    return await this.policyModel.findOne(conditions);
  }
  async findPolicies(conditions: {}) {
    return await this.policyModel.find(conditions);
  }
}
