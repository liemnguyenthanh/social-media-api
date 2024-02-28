import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/repositories/base.abstract.repository';
import { ArticleRepositoryInterface } from './article.interface';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleRepository
  extends BaseRepositoryAbstract<Article>
  implements ArticleRepositoryInterface
{
  constructor(
    @InjectModel(Article.name)
    private readonly article_repository: Model<Article>,
  ) {
    super(article_repository);
  }
}
