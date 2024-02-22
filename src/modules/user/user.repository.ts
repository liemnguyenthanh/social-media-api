import { BaseRepositoryAbstract } from 'src/repositories/base.abstract.repository';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './user.interface';
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
    private readonly user_repository: Model<User>,
  ) {
    super(user_repository);
  }
}
