import { BaseRepositoryAbstract } from 'src/repositories/base.abstract.repository';
import { User } from '../modules/users/entities/user.entity';
import { UserRepositoryInterface } from '../modules/users/users.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {
    super(userRepository);
  }
}