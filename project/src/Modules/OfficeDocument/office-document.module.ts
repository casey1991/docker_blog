import { Module } from '@nestjs/common';

import { OfficeDocumentService } from './office-document.service';
import { officeDocumentProviders } from './office-document.providers';
import { DatabaseModule } from '../Database/database.module';
import { OfficeDocumentResolver } from './office-document.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    OfficeDocumentService,
    ...officeDocumentProviders,
    OfficeDocumentResolver,
  ],
})
export class OfficeDocumentModule {}
