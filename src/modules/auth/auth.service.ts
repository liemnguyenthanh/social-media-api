import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
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

  async signup(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findOneByCondition({
      username: signUpDto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(signUpDto.password, salt);
    signUpDto.password = hashPassword;

    const newUser = await this.userService.create(signUpDto);
    if (!newUser) {
      throw new BadGatewayException();
    }
    const payload = { username: newUser.username, userId: newUser._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
