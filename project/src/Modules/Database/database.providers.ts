import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb://mongo',
        {
          user: 'root',
          pass: 'password',
          dbName: 'blog',
          useNewUrlParser: true,
        },
      ),
  },
];
