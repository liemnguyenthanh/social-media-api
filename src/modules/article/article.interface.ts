import { BaseRepositoryInterface } from 'src/repositories/base.interface.repository';
import { Article } from './entities/article.entity';

export interface ArticleRepositoryInterface
  extends BaseRepositoryInterface<Article> {}
