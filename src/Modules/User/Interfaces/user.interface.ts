import { Document } from 'mongoose';
import { File } from '../../File/Interfaces/file.interface';
export interface User extends Document {
  readonly email: string;
  readonly password: string;
  avatars: [File];
}
