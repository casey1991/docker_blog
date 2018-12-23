import { Connection } from 'mongoose';
import { FileSchema } from './Schemas/file.schema';

export const fileProviders = [
  {
    provide: 'FileModelToken',
    useFactory: (connection: Connection) =>
      connection.model('File', FileSchema),
    inject: ['DbConnectionToken'],
  },
];
