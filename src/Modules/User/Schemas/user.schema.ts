import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: mongoose.SchemaTypes.String, required: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
});
