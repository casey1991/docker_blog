import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { MinioService } from './Minio/minio.service';
@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body('bucket') bucket) {
    const result = await this.minioService.putObject(
      bucket,
      file.originalname,
      file.buffer,
      file.size,
      file.mimetype,
    );
    return result;
  }
  @Get('presigned')
  async getFile(
    @Query('bucket') bucket,
    @Query('object') object,
  ): Promise<String> {
    return await this.minioService.presignedGetObject(bucket, object);
  }
}
