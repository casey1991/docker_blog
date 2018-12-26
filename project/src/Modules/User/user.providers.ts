import { Connection } from 'mongoose';
import { UserSchema } from './Schemas/user.schema';

export const userProviders = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DbConnectionToken'],
  },
];
