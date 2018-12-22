import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Inject,
} from '@nestjs/common';

@Controller('file')
export class FileController {
  constructor(@Inject('MinioToken') private readonly minioService: any) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const result = await this.minioService.putObject(
      'images',
      file.originalname,
      file.buffer,
      file.size,
    );
  }
}
