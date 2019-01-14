import * as mongoose from 'mongoose';
const SchemaTypes = mongoose.SchemaTypes;
export const RoomSchema = new mongoose.Schema(
  {
    name: { type: SchemaTypes.String, required: true },
    users: [SchemaTypes.ObjectId],
    messages: [SchemaTypes.ObjectId],
  },
  { timestamps: true },
);
