import * as mongoose from 'mongoose';

export const OfficeDocumentSchema = new mongoose.Schema({
  name: { type: mongoose.SchemaTypes.String, required: true },
  age: { type: mongoose.SchemaTypes.Number, default: 0 },
  description: { type: mongoose.SchemaTypes.String },
  breed: {
    type: mongoose.SchemaTypes.String,
  },
});
