import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { MinioModule } from './Minio/minio.module';
import { FileResolver } from './file.resolver';
import { fileProviders } from './file.providers';
import { FileService } from './file.service';
import { FileController } from './file.controller';
@Module({
  imports: [DatabaseModule, MinioModule],
  controllers: [FileController],
  providers: [FileService, FileResolver, ...fileProviders],
})
export class FileModule {}
