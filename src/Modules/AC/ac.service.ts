// npm
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ACService {
  constructor(@Inject('ACToken') private readonly acl: any) {}
}
