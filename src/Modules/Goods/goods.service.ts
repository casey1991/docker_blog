import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { GoodsDocument } from './Interfaces/goods.interface';

@Injectable()
export class GoodsService {
  constructor(
    @Inject('GoodsModelToken')
    private readonly goodsModel: Model<GoodsDocument>,
  ) {}

  async create(goods: {}): Promise<GoodsDocument> {
    const cratedCat = new this.goodsModel(goods);
    return await cratedCat.save();
  }
  async update(conditions: {}, update: {}): Promise<GoodsDocument> {
    return await this.goodsModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async delete(conditions: {}) {
    return await this.goodsModel.findOneAndRemove(conditions);
  }
  async deleteMany(conditions: {}) {
    return await this.goodsModel.deleteMany(conditions);
  }
  async findOne(conditions: {}): Promise<GoodsDocument> {
    return this.goodsModel.findOne(conditions);
  }
  async findAll(): Promise<GoodsDocument[]> {
    return await this.goodsModel.find().exec();
  }
}
