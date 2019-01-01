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
  /**
   *  Generates a presigned URL for the provided HTTP method, 'httpMethod'.
   *  Browsers/Mobile clients may point to this URL to directly download objects even if the bucket is private.
   *  This presigned URL can have an associated expiration time in seconds after which the URL is no longer valid. The default value is 7 days.
   *
   * @param bucketName
   * @param objectName
   * @param expiry
   */
  async presignedUrl(httpMethod, bucketName, objectName): Promise<String> {
    return await this.minio.presignedUrl(
      httpMethod,
      bucketName,
      objectName,
      24 * 60 * 60,
    );
  }
  async presignedGetObject(bucketName, objectName): Promise<String> {
    return await this.minio.presignedGetObject(
      bucketName,
      objectName,
      24 * 60 * 60,
    );
  }
}
