import { Mongoose } from 'mongoose';
import * as Acl from 'acl';
// import { Acl, MemoryBackend } from '../../../../lib/Acl';
import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  Inject,
} from '@nestjs/common';
@Injectable()
export class ACLMiddleware implements NestMiddleware {
  constructor(
    @Inject('DbConnectionToken') private readonly connection: Mongoose,
  ) {}
  resolve(...args: any[]): MiddlewareFunction {
    //   init acl and put it in req
    return (req, res, next) => {
      const acl = new Acl(
        new Acl.mongodbBackend(this.connection.connection.db, 'acl_'),
      );
      // const acl = new Acl(new MemoryBackend());
      req.acl = acl;
      next();
    };
  }
}
