import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { miniProviders } from './minio.providers';
@Module({
  providers: [MinioService, ...miniProviders],
  exports: [...miniProviders],
})
export class MinioModule {}
