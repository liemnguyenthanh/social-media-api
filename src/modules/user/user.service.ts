import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { BaseServiceAbstract } from 'src/services/base.abstract.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './user.interface';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(
    @InjectModel('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super(userRepository);
  }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneByCondition({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;

    return await this.userRepository.create(createUserDto);
  }

  async findAll(
    filter?: object,
    protections?: string,
    options?: object,
  ): Promise<User[]> {
    return await this.userRepository.findAll(filter, protections, options);
  }
}
