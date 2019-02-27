import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AC } from '../../../../lib/ac';
@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user) return false;
    const ac: AC = req.ac;
    const policy: any = this.reflector.get<string[]>(
      'policy',
      context.getHandler(),
    );
    // check access use ac and policy
    return await ac.isAllowed(
      req.user._id.toString(),
      [policy.resource],
      [policy.permission],
    );
  }
}
