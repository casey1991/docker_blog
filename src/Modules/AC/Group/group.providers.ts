import { Connection } from 'mongoose';
import { GroupSchema } from '../schemas/group.schema';
export const groupProviders = [
  {
    provide: 'GroupModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Group', GroupSchema),
    inject: ['DbConnectionToken'],
  },
];
