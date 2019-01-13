import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const MessageSchema = new mongoose.Schema({
  text: { type: SchemaTypes.String },
  owner: { type: SchemaTypes.ObjectId },
});
export const RoomSchema = new mongoose.Schema({
  name: { type: SchemaTypes.String, required: true },
  users: [SchemaTypes.ObjectId],
  messages: [MessageSchema],
  createdAt: { type: SchemaTypes.Date, default: Date.now },
  updatedAt: { type: SchemaTypes.Date, default: Date.now },
});
