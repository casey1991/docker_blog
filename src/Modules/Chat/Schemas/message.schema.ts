import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const MessageSchema = new mongoose.Schema(
  {
    text: { type: SchemaTypes.String },
    owner: { type: SchemaTypes.ObjectId, required: true },
    room: { type: SchemaTypes.ObjectId, required: true },
  },
  { timestamps: true },
);
