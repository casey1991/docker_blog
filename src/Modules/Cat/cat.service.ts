import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Cat } from './Interfaces/cat.interface';

@Injectable()
export class CatService {
  constructor(
    @Inject('CatModelToken')
    private readonly catModel: Model<Cat>,
  ) {}

  async create(cat: {}): Promise<Cat> {
    const cratedCat = new this.catModel(cat);
    return await cratedCat.save();
  }
  async update(conditions: {}, update: {}): Promise<Cat> {
    return await this.catModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async delete(conditions: {}) {
    return await this.catModel.findOneAndRemove(conditions);
  }
  async deleteMany(conditions: {}) {
    return await this.catModel.deleteMany(conditions);
  }
  async findOne(conditions: {}): Promise<Cat> {
    return this.catModel.findOne(conditions);
  }
  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
