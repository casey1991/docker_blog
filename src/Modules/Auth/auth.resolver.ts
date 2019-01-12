import { Resolver } from '@nestjs/graphql';
import { ValidationError } from 'apollo-server-express';
// graplql actions
import { Query, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
// services
import { AuthService } from './auth.service';
import { RedisService } from '../Redis/redis.service';
import { ConfigService } from '../Config/config.service';
@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}
  @Mutation('signUp')
  async signUp(@Args('email') email, @Args('password') password) {
    return await this.authService.signUp(email, password);
  }
  @Mutation('createToken')
  async createToken(@Args('email') email, @Args('password') password) {
    // CAPTCHA
    // 3. get captcha status from redis, if vertified is true, pass
    if (this.config.get('CAPTCHA_ENABLE')) {
      const captcha =
        JSON.parse(await this.redisService.get(`CAPTCHA_${email}`)) || {};
      if (!captcha.verified) {
        throw ValidationError;
      }
    }
    return await this.authService.createToken(email, password);
  }
  @Mutation('createCaptcha')
  async createCaptcha(@Args('email') email) {
    // CAPTCHA
    // 1. create number and set to redis
    const captcha = JSON.stringify({ code: 'abc123', verified: false });
    const result = await this.redisService.set(
      `CAPTCHA_${email}`,
      captcha,
      'EX',
      5,
    );
    if (result === 'OK') return true;
    return false;
  }
  @Mutation('modifyCaptchaStatus')
  async modifyCaptchaStatus(
    @Args('email') email: string,
    @Args('captcha') code,
  ) {
    // CAPTCHA
    // 2. modify captcha when code is equal
    const captcha = JSON.parse(await this.redisService.get(`CAPTCHA_${email}`));
    if (captcha.code === code) {
      const captcha = JSON.stringify({ code: 'abc123', verified: true });
      await this.redisService.set(`CAPTCHA_${email}`, captcha, 'EX', 5);
    }
    return true; // always return true until something wrong(eg:key not exit)
  }
}
