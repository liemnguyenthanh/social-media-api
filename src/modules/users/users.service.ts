import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseServiceAbstract } from 'src/services/base.abstract.service';

import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './users.interface';

@Injectable()
export class UserService extends BaseServiceAbstract<User> {
  constructor(
    @InjectModel('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {
    super(userRepository);
  }

  async findAll(
    filter?: object,
    protections?: string,
    options?: object,
  ): Promise<User[]> {
    return await this.userRepository.findAll(filter, protections, options);
  }
}
