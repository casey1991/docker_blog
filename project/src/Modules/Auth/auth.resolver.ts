import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { AuthService } from './auth.service';
@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation('signIn')
  async signIn(@Args('email') email, @Args('password') password) {
    return await this.authService.signIn(email, password);
  }
}
