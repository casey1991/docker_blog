import * as mongoose from 'mongoose';
const schemaTypes = mongoose.SchemaTypes;
export const PolicySchema = new mongoose.Schema(
  {
    resource: { type: schemaTypes.String, required: true },
    action: { type: schemaTypes.String, required: true },
  },
  {
    timestamps: true,
  },
);
