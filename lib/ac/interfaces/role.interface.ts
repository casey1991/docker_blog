import { Document } from 'mongoose';
import { Policy } from './policy.interface';
export interface Role extends Document {
  name: string;
  users: string;
  policies: [Policy];
}
