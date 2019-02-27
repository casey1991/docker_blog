import {Group} from './group.interface';
export interface AC {
  userGroups(userId: string): Promise<Group[]>;
  isAllowed(userId: string, resources: string[], permissions: string[]): Promise<boolean>;
}
