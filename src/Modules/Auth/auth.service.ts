import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../User/Interfaces/user.interface';
import { Auth } from './interfaces/auth';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: String, password: String): Promise<User> {
    const user = await this.userService.create({ email, password });
    return user;
  }
  async createToken(email: String, password: String): Promise<Auth> {
    const user = await this.userService.findOne({
      email: email,
      password: password,
    });
    if (user)
      return { accessToken: this.jwtService.sign({ email: user.email }) };
    return null;
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOne({ email: payload.email });
  }
}
