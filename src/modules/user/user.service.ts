import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindAllResponse } from 'src/repositories/base.interface.repository';
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

    return await this.user_repository.create(createUserDto);
  }

  async findAll(
    filter?: object,
    options?: object,
  ): Promise<FindAllResponse<User>> {
    return await this.user_repository.findAll(filter, options);
  }
}
