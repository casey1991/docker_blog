import { Connection } from 'mongoose';
import { NoteSchema } from './Schemas/note.schema';

export const noteProviders = [
  {
    provide: 'NoteModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Note', NoteSchema),
    inject: ['DbConnectionToken'],
  },
];
