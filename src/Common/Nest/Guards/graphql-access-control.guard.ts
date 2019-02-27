import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AC } from '../../../../lib/ac';
@Injectable()
export class GraphqlAccessControlGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const policy: any = this.reflector.get<string[]>(
      'policy',
      context.getHandler(),
    );
    const ac: AC = req.ac;
    const result = await ac.isAllowed(
      req.user._id.toString(),
      [policy.resource],
      [policy.permission],
    );
    return result;
  }
}
