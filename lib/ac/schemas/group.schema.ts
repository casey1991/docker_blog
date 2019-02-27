import * as mongoose from 'mongoose';
const schemaTypes = mongoose.SchemaTypes;
export const GroupSchema = new mongoose.Schema(
  {
    name: { type: schemaTypes.String, required: true, unique: true },
    users: [{ type: schemaTypes.ObjectId }],
    policies: [{ type: schemaTypes.ObjectId }],
  },
  {
    timestamps: true,
  },
);
