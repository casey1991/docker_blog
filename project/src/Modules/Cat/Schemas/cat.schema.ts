import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: { type: mongoose.SchemaTypes.String, required: true },
  age: { type: mongoose.SchemaTypes.Number, default: 0 },
  breed: {
    type: mongoose.SchemaTypes.String,
  },
});
