import { AC as ACInterface, Role, Policy } from './interfaces';
import { RoleSchema, PolicySchema } from './schemas';
import { Connection, Model } from 'mongoose';
import { map, uniq, every, find, each, concat, reduce } from 'lodash';
export class AC implements ACInterface {
  private readonly _connection: Connection;
  private readonly _roles: Model<Role>;
  private readonly _policies: Model<Policy>;
  constructor(connection: Connection) {
    this._connection = connection;
    this._roles = this._connection.model('Groups', RoleSchema);
    this._policies = this._connection.model('Policies', PolicySchema);
  }
  async userGroups(userId: string): Promise<Role[]> {
    return null;
  }
  async isAllowed(
    userId: string,
    resources: string[],
    permissions: string[],
  ): Promise<boolean> {
    const roleDocs = await this._roles.find({ users: { $in: [userId] } });
    if (!roleDocs) return false;
    const policyIdArrays = map(roleDocs, group => group.policies);
    let policyIds = reduce(
      policyIdArrays,
      (sum, n) => {
        return concat(sum, n);
      },
      [],
    );
    const policyDocs = await this._policies.find({ _id: { $in: policyIds } });
    // check resource and permissions is equal?
    const processedResourceNames = uniq(
      map(policyDocs, policy => policy.resource),
    );
    const processedPermissionNames = uniq(
      map(policyDocs, policy => policy.action),
    );
    if (
      every(resources, resource =>
        find(processedResourceNames, item => resource === item),
      ) &&
      every(permissions, permission =>
        find(processedPermissionNames, item => permission === item),
      )
    ) {
      return true;
    }
    return false;
  }
}
