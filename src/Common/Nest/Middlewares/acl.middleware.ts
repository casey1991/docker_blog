import * as mongodb from 'mongodb';
import * as Acl from 'acl';
import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  Inject,
} from '@nestjs/common';
import { Mongoose } from 'mongoose';
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
      req.acl = acl;
      next();
    };
  }
}
