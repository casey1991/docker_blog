import { Connection } from 'mongoose';
import { RoomSchema } from './Schemas/chat.schema';

export const chatProviders = [
  {
    provide: 'RoomModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Room', RoomSchema),
    inject: ['DbConnectionToken'],
  },
];
