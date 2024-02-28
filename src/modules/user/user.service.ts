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
    private readonly user_repository: UserRepositoryInterface,
  ) {
    super(user_repository);
  }
  async create(createUserDto: CreateUserDto) {
    const existing_user = await this.user_repository.findOneByCondition({
      username: createUserDto.username,
    });
    if (existing_user) {
      throw new ConflictException('Username is already taken');
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;

    return await this.user_repository.create(createUserDto);
  }

  async findAll(
    filter?: object,
    protections?: string,
    options?: object,
  ): Promise<User[]> {
    return await this.user_repository.findAll(filter, protections, options);
  }
}
