import * as mongoose from 'mongoose';

export const GoodsSchema = new mongoose.Schema({
  author: { type: mongoose.SchemaTypes.ObjectId, required: true },
  createdAt: { type: mongoose.SchemaTypes.Date, default: Date.now },
  updatedAt: { type: mongoose.SchemaTypes.Date, default: Date.now },
});
