// import { Promise as BuleBirdPromise } from 'bluebird';
import { extend, find, forEach } from 'lodash';
import { Backend } from './backend.interface';
import { allowsBucket } from './utils';

export class Acl {
  private readonly backend: Backend;
  private readonly logger: any;
  private readonly options: any;
  constructor(backend: Backend, logger?, options?) {
    this.backend = backend;
    this.logger = logger;
    this.options = extend(
      {
        buckets: {
          meta: 'meta',
          parents: 'parents',
          permissions: 'permissions',
          resources: 'resources',
          roles: 'roles',
          users: 'users',
        },
      },
      options,
    );
  }
  async addUserRoles(userId: string, roles: Array<any>): Promise<any> {
    var transaction = this.backend.begin();
    await this.backend.add(transaction, this.options.buckets.meta, 'users', [
      userId,
    ]);
    await this.backend.add(
      transaction,
      this.options.buckets.roles,
      userId,
      roles,
    );
    return this.backend.end(transaction);
  }
  async removeUserRoles(userId: string, roles: any[]) {
    const transaction = this.backend.begin();
    await this.backend.remove(
      transaction,
      this.options.buckets.users,
      userId,
      roles,
    );
    return this.backend.end(transaction);
  }
  async userRoles(userId: string): Promise<any[]> {
    return this.backend.get(this.options.buckets.users, userId);
  }
  async roleUsers(roleName: string): Promise<any[]> {
    return this.backend.get(this.options.buckets.roles, roleName);
  }
  async hasRole(userId: string, role: string): Promise<boolean> {
    return find(await this.userRoles(userId), item => item === role);
  }
  async addRoleParents() {
    // TODO:
  }
  async removeRoleParents() {
    // TODO:
  }
  async removeRole(role: string) {
    let transaction = this.backend.begin();
    const resourcePromises = await this.backend.get(
      this.options.buckets.resources,
      role,
    );
    forEach(resourcePromises, resource => {
      var bucket = allowsBucket(resource);
      this.backend.del(transaction, bucket, [role]);
    });
    this.backend.del(transaction, this.options.buckets.resources, [role]);
    this.backend.del(transaction, this.options.buckets.parents, [role]);
    this.backend.del(transaction, this.options.roles, [role]);
    this.backend.remove(transaction, this.options.buckets.meta, 'roles', [
      role,
    ]);
    return this.backend.end(transaction);
  }
  async removeResource(resource: string) {
    // TODO
  }
  async allow(roles: string[], resources: string[], permissions: string[]) {
    // TODO
  }
  async removeAllow(role: string, resources: string[], permissions: string[]) {
    // TODO
  }
  async removePermissions(
    role: string,
    resources: string[],
    permissions: string[],
  ) {
    // TODO
  }
  async allowedPermissions(userId: string, resources: string[]) {
    // TODO
  }
  async optimizedAllowedPermissions(userId: string, resources: string[]) {
    // TODO
  }

  async isAllowed(userId: string, resource: string, permissions: string[]) {
    // TODO
  }
  async areAnyRolesAllowed(
    roles: string[],
    resource: string,
    permissions: string[],
  ) {
    // TODO
  }
  async whatResources(roles: string[], permissions: string[]) {
    // TODO
  }
  async permittedResources(roles: string[], permissions: string[]) {
    // TODO
  }
}
