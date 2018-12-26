import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: String, password: String): Promise<string> {
    const user = this.userService.create({ email, password });
    return this.jwtService.sign(user);
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOne({ email: payload.email });
  }
}
