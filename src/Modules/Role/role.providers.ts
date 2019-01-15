import { Mongoose } from 'mongoose';
import * as Acl from 'acl';
export const roleProviders = [
  {
    provide: 'ACLDbToken',
    useFactory: (connection: Mongoose) => {
      return new Acl(new Acl.mongodbBackend(connection.connection.db, 'acl_'));
    },
    inject: ['DbConnectionToken'],
  },
];
