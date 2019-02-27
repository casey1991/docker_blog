import { Connection } from 'mongoose';
import { PolicySchema } from '../schemas/policy.schema';
export const policyProviders = [
  {
    provide: 'PolicyModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Policy', PolicySchema),
    inject: ['DbConnectionToken'],
  },
];
