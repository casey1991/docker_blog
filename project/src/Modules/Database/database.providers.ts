import * as mongoose from 'mongoose';
import { ConfigService } from '../Config/config.service';
export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (config: ConfigService): Promise<typeof mongoose> =>
      await mongoose.connect(
        config.get('DATABASE_URL'),
        {
          user: config.get('DATABASE_USER'),
          pass: config.get('DATABASE_PASSWORD'),
          dbName: config.get('DATABASE_NAME'),
          useNewUrlParser: true,
        },
      ),
    inject: [ConfigService],
  },
];
