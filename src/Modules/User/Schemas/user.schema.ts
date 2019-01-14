import * as mongoose from 'mongoose';
const { SchemaTypes } = mongoose;
export const UserSchema = new mongoose.Schema({
  email: { type: SchemaTypes.String, required: true },
  password: { type: SchemaTypes.String, required: true },
  avatars: [SchemaTypes.ObjectId],
});
