import { BaseRepositoryInterface } from 'src/repositories/base.interface.repository';
import { User } from './entities/user.entity';

export interface UserRepositoryInterface
  extends BaseRepositoryInterface<User> {}
