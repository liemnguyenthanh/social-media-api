import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/repositories/base.abstract.repository';
import { ArticleRepositoryInterface } from '../modules/article/article.interface';
import { Article } from '../modules/article/entities/article.entity';

@Injectable()
export class ArticleRepository
  extends BaseRepositoryAbstract<Article>
  implements ArticleRepositoryInterface
{
  constructor(
    @InjectModel(Article.name)
    private readonly articleRepository: Model<Article>,
  ) {
    super(articleRepository);
  }
}
