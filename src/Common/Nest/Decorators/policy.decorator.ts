import { ReflectMetadata } from '@nestjs/common';
interface Policy {
  resource: string;
  permission: 'CREATE' | 'VIEW' | 'EDIT' | 'DELETE';
  possession?: 'OWN' | 'ANY';
}
export const Policy = (policy: Policy) => ReflectMetadata('policy', policy);
