import * as mongoose from 'mongoose';
const schemaTypes = mongoose.SchemaTypes;
export const PolicySchema = new mongoose.Schema(
  {
    Statement: [
      {
        Effect: schemaTypes.String,
        action: [schemaTypes.String],
        resource: schemaTypes.String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
