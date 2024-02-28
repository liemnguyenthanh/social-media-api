import { QueryOptions } from 'mongoose';

export type FindAllResponse<T> = { count: number; items: T[] };

export interface BaseRepositoryInterface<T> {
  create(dto: T | any): Promise<T>;

  findOneById(id: string, options?: object): Promise<T>;

  findOneByCondition(condition?: object, projection?: string): Promise<T>;

  findAll(
    condition: object,
    projection?: string,
    options?: QueryOptions,
  ): Promise<T[]>;

  update(id: string, dto: Partial<T>): Promise<T>;

  softDelete(id: string): Promise<boolean>;

  permanentlyDelete(id: string): Promise<boolean>;
}
