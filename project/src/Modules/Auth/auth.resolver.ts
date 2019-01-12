import { Resolver } from '@nestjs/graphql';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { AuthService } from './auth.service';
@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation('signUp')
  async signUp(@Args('email') email, @Args('password') password) {
    return await this.authService.signUp(email, password);
  }
  @Mutation('createToken')
  async createToken(@Args('email') email, @Args('password') password) {
    return await this.authService.createToken(email, password);
  }
  @Mutation('createCaptcha')
  async createCaptcha() {
    return true;
  }
}
