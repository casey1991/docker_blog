import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const GoodsSchema = new mongoose.Schema({
  name: { type: SchemaTypes.String, required: true },
  price: { type: SchemaTypes.Number, required: true },
  amount: { type: SchemaTypes.Number, required: true },
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  updatedAt: { type: SchemaTypes.Date, default: Date.now },
  owner: { type: SchemaTypes.ObjectId, required: true },
});
