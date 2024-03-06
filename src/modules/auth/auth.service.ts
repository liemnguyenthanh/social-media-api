import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByCondition({ username });

    if (!user) return null;

    const match = await bcrypt.compare(pass, user.password);

    if (!match) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
