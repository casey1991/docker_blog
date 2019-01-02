import { Model } from 'mongoose';
import { Injectable, Inject, createParamDecorator } from '@nestjs/common';
import { OfficeDocument } from './Interfaces/office-document.interface';

@Injectable()
export class OfficeDocumentService {
  constructor(
    @Inject('OfficeDocumentModelToken')
    private readonly documentModel: Model<OfficeDocument>,
  ) {}

  async create(cat: {}): Promise<OfficeDocument> {
    const cratedCat = new this.documentModel(cat);
    return await cratedCat.save();
  }
  async update(conditions: {}, update: {}): Promise<OfficeDocument> {
    return await this.documentModel.findOneAndUpdate(conditions, update, {
      new: true,
    });
  }
  async delete(conditions: {}) {
    return await this.documentModel.findOneAndRemove(conditions);
  }
  async deleteMany(conditions: {}) {
    return await this.documentModel.deleteMany(conditions);
  }
  async findOne(conditions: {}): Promise<OfficeDocument> {
    return this.documentModel.findOne(conditions);
  }
  async findAll(): Promise<OfficeDocument[]> {
    return await this.documentModel.find().exec();
  }
}
