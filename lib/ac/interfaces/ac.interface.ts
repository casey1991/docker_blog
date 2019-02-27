import { Role } from './role.interface';
export interface AC {
  userGroups(userId: string): Promise<Role[]>;
  isAllowed(
    userId: string,
    resources: string[],
    permissions: string[],
  ): Promise<boolean>;
}
