import { Document } from 'mongoose';
import { Policy } from './policy.interface';
export interface Group extends Document {
  name: string;
  users: string;
  policies: [Policy];
}
