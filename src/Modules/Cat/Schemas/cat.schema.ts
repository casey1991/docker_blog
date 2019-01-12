import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const CatSchema = new mongoose.Schema({
  name: { type: SchemaTypes.String, required: true },
  age: { type: SchemaTypes.Number, default: 0 },
  description: { type: SchemaTypes.String },
  breed: {
    type: SchemaTypes.String,
  },
  owner: { type: SchemaTypes.ObjectId, required: true },
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  updatedAt: { type: SchemaTypes.Date, default: Date.now },
});
