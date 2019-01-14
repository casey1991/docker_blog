import { Document } from 'mongoose';

export interface File extends Document {
  readonly name: string;
  readonly miniType: string;
  readonly url: string;
}
