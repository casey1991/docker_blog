import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveProperty,
  Parent,
  Subscription,
} from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
// services
import { RoleService } from './role.service';
import { UserService } from '../User/user.service';
// guards
import { GqlAuthGuard } from '../Auth/graphql-auth.guard';
// decorators
import { User } from '../Auth/graphql-user-context.decorator';

const pubSub = new PubSub();
@Resolver('Room')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}
}
