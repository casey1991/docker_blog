import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: { type: mongoose.SchemaTypes.String, required: true },
  miniType: { type: mongoose.SchemaTypes.String },
  url: { type: mongoose.SchemaTypes.String },
});
