import * as mongodb from 'mongodb';
import * as Acl from 'acl';
import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class ACLMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    //   init acl and put it in req
    return (req, res, next) => {
      mongodb.connect(
        'mongodb://127.0.0.1:27017/blog_acl',
        function(error, db) {
          var mongoBackend = new Acl.mongodbBackend(db);
          const acl = new Acl(mongoBackend, '');
          req.acl = acl;
          next();
        },
      );
    };
  }
}
