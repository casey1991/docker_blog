import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Inject,
} from '@nestjs/common';
import { MinioService } from './Minio/minio.service';
@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const result = await this.minioService.putObject(
      'office',
      file.originalname,
      file.buffer,
      file.size,
      file.mimetype,
    );
    return result;
  }
}
