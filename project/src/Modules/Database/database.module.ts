import { Module } from '@nestjs/common';
import { ConfigModule } from '../Config/config.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
