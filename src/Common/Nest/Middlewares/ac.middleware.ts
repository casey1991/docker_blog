import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  Inject,
} from '@nestjs/common';
import { AC } from '../../../../lib/ac';
@Injectable()
export class ACMiddleware implements NestMiddleware {
  constructor(@Inject('ACToken') private readonly ac: AC) {}
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      req.ac = this.ac;
      next();
    };
  }
}
