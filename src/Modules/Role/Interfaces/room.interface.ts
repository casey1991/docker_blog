import { Document } from 'mongoose';
import { Message } from './message.interface';
import { User } from '../../User/Interfaces/user.interface';
export interface Room extends Document {
  readonly name: string;
  readonly users: [User];
  readonly messages: [Message];
}
