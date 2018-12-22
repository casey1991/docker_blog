import { Connection } from 'mongoose';
import * as Minio from 'minio';
import { FileSchema } from './Schemas/file.schema';

export const fileProviders = [
  {
    provide: 'FileModelToken',
    useFactory: (connection: Connection) =>
      connection.model('File', FileSchema),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'MinioToken',
    useFactory: () => {
      return new Minio.Client({
        endPoint: 'minio',
        port: 9000,
        useSSL: false,
        accessKey: 'caseywang',
        secretKey: 'wangyang_1991',
      });
    },
  },
];
