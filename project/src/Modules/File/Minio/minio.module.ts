import { Module } from '@nestjs/common';
import { ConfigModule } from '../../Config/config.module';
import { MinioService } from './minio.service';
import { miniProviders } from './minio.providers';
@Module({
  imports: [ConfigModule],
  providers: [MinioService, ...miniProviders],
  exports: [...miniProviders],
})
export class MinioModule {}
