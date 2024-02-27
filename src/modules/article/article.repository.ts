import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/repositories/base.abstract.repository';
import { FindAllResponse } from 'src/repositories/base.interface.repository';
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

  async findAllWithSubFields(
    condition: object,
    projection?: string,
    populate?: PopulateOptions,
  ): Promise<FindAllResponse<Article>> {
    const [count, items] = await Promise.all([
      this.article_repository.countDocuments({
        ...condition,
        deleted_at: null,
      }),
      this.article_repository
        .find({ ...condition, deleted_at: null }, projection)
        .populate(populate),
    ]);
    return { count, items };
  }

  async findWithSubFields(
    condition: object,
    projection?: string,
    populate?: PopulateOptions,
  ): Promise<Article> {
    return this.article_repository
      .findOne({ ...condition, deleted_at: null }, projection)
      .populate(populate);
  }
}
