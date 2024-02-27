import {
  BaseRepositoryInterface,
  FindAllResponse,
} from 'src/repositories/base.interface.repository';
import { Article } from './entities/article.entity';

export interface ArticleRepositoryInterface
  extends BaseRepositoryInterface<Article> {
  findAllWithSubFields(
    condition: object,
    projection?: string,
    populate?: string[] | any,
  ): Promise<FindAllResponse<Article>>;

  findWithSubFields(
    condition: object,
    projection?: string,
    populate?: string[] | any,
  ): Promise<Article>;
}
