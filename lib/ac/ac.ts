import { AC as ACInterface, Group, Policy } from './interfaces';
import { GroupSchema, PolicySchema } from './schemas';
import { Connection, Model } from 'mongoose';
import { map, uniq, every, find, each, concat, reduce } from 'lodash';
export class AC implements ACInterface {
  private readonly _connection: Connection;
  private readonly _groups: Model<Group>;
  private readonly _policies: Model<Policy>;
  constructor(connection: Connection) {
    this._connection = connection;
    this._groups = this._connection.model('Groups', GroupSchema);
    this._policies = this._connection.model('Policies', PolicySchema);
  }
  async userGroups(userId: string): Promise<Group[]> {
    return null;
  }
  async isAllowed(
    userId: string,
    resources: string[],
    permissions: string[],
  ): Promise<boolean> {
    const groupDocs = await this._groups.find({ users: { $in: [userId] } });
    if (!groupDocs) return false;
    const policyIdArrays = map(groupDocs, group => group.policies);
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
