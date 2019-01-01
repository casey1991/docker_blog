import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class MinioService {
  constructor(@Inject('MinioToken') private readonly minio: any) {}
  /**
   *  Uploads an object from a stream/Buffer.
   *
   * @param bucketName
   * @param objectName
   * @param stream
   * @param size
   * @param mataData
   */
  async putObject(
    bucketName,
    objectName,
    stream,
    size,
    mataData,
  ): Promise<String> {
    return await this.minio.putObject(
      bucketName,
      objectName,
      stream,
      size,
      mataData,
    );
  }
}
