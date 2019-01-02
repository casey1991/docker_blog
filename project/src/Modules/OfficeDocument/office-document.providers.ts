import { Connection } from 'mongoose';
import { OfficeDocumentSchema } from './Schemas/office-document.schema';

export const officeDocumentProviders = [
  {
    provide: 'OfficeDocumentModelToken',
    useFactory: (connection: Connection) =>
      connection.model('OfficeDocument', OfficeDocumentSchema),
    inject: ['DbConnectionToken'],
  },
];
