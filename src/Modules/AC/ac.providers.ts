import { Connection } from 'mongoose';
import { AC } from '../../../lib/ac';
export const acProviders = [
  {
    provide: 'ACToken',
    useFactory: async (connection: Connection): Promise<any> => {
      return new AC(connection);
    },
    inject: ['DbConnectionToken'],
  },
];
