import { Connection } from 'mongoose';
import { MessageSchema } from './Schemas/message.schema';
import { RoomSchema } from './Schemas/room.schema';
export const chatProviders = [
  {
    provide: 'RoomModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Room', RoomSchema),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'MessageModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Message', MessageSchema),
    inject: ['DbConnectionToken'],
  },
];
