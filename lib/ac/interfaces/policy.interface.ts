import {Document} from 'mongoose';
export interface Policy extends Document {
  resource: string;
  action: string;
}
