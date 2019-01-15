import { Document } from 'mongoose';
import { Room } from './room.interface';
import { User } from '../../User/Interfaces/user.interface';
export interface Message extends Document {
  readonly text: string;
  readonly room: [Room];
  readonly owner: User;
}
