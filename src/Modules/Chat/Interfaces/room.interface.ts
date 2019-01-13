import { Document } from 'mongoose';
import { Message } from './message.interface';
export interface Room extends Document {
  readonly name: string;
  readonly users: [any];
  readonly messages: [Message];
}
