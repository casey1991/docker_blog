import { createParamDecorator } from '@nestjs/common';

export const ACL = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.acl,
);
