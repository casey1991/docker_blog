import {Document, PaginateModel} from 'mongoose';
import {Policy} from './policy.interface';
export interface Group extends Document {
  name: string;
  users: string;
  policies: [Policy];
}
export interface GroupModel<T extends Document> extends PaginateModel<T> {}
