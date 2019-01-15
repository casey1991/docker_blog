import { Mongoose } from 'mongoose';
import * as Acl from 'acl';
export const roleProviders = [
  {
    provide: 'ACLRedisToken',
    useFactory: (connection: any) => {
      return new Acl(new Acl.redisBackend(connection));
    },
    inject: ['RedisConnectionToken'],
  },
  {
    provide: 'ACLDbToken',
    useFactory: (connection: Mongoose) => {
      return new Acl(new Acl.mongodbBackend(connection.connection.db, 'acl_'));
    },
    inject: ['DbConnectionToken'],
  },
];
