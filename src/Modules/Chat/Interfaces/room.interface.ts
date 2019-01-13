import { Document } from 'mongoose';

export interface Room extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
