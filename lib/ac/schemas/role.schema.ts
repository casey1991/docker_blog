import * as mongoose from 'mongoose';
const schemaTypes = mongoose.SchemaTypes;
export const RoleSchema = new mongoose.Schema(
  {
    name: { type: schemaTypes.String, required: true, unique: true },
    users: [{ type: schemaTypes.ObjectId, ref: 'Users' }],
    policies: [{ type: schemaTypes.ObjectId, ref: 'Policies' }],
  },
  {
    timestamps: true,
  },
);
