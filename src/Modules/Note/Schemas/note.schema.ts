import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const NoteSchema = new mongoose.Schema({
  title: { type: SchemaTypes.String, required: true },
  content: { type: SchemaTypes.String },
  owner: { type: SchemaTypes.ObjectId, required: true },
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  updatedAt: { type: SchemaTypes.Date, default: Date.now },
});
