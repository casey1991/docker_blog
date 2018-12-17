import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { Cat } from './Interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CatModelToken')
    private readonly catModel: Model<Cat>,
  ) {}

  async create(cat: {}): Promise<Cat> {
    const cratedCat = new this.catModel(cat);
    return await cratedCat.save();
  }
  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }
}
