import { Document } from 'mongoose';

export interface Message extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
