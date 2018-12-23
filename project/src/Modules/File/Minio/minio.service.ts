import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class MinioService {
  constructor(@Inject('MinioToken') private readonly minio: any) {}
}
