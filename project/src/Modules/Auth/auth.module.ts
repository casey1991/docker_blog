import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { DatabaseModule } from '../Database/database.module';
import { UserModule } from '../User/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { RedisModule } from '../Redis/redis.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RedisModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
