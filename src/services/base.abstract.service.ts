import { BaseEntity } from 'src/modules/shared/base/base.entity';
import { BaseRepositoryInterface } from 'src/repositories/base.interface.repository';
import { BaseServiceInterface } from './base.interface.service';
import { QueryOptions } from 'mongoose';

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(create_dto: T | any): Promise<T> {
    return await this.repository.create(create_dto);
  }

  async findAll(
    filter?: object,
    protections?: string,
    options?: QueryOptions,
  ): Promise<T[]> {
    return await this.repository.findAll(filter, protections, options);
  }

  async findOne(id: string) {
    return await this.repository.findOneById(id);
  }

  async findOneByCondition(conditions: object) {
    return await this.repository.findOneByCondition(conditions);
  }

  async update(id: string, update_dto: Partial<T>) {
    return await this.repository.update(id, update_dto);
  }

  async remove(id: string) {
    return await this.repository.softDelete(id);
  }
}
