import { Module } from '@nestjs/common';

import { NoteService } from './note.service';
import { noteProviders } from './note.providers';
import { DatabaseModule } from '../Database/database.module';
import { NoteResolver } from './note.resolver';
import { UserModule } from '../User/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [NoteService, ...noteProviders, NoteResolver],
  exports: [NoteService],
})
export class NoteModule {}
