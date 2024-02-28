import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleRepositoryInterface } from './article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import mongoose from 'mongoose';

const populateAuthor = {
  path: 'author',
  select: ['_id', 'username', 'full_name'],
};

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('ArticleRepositoryInterface')
    private readonly article_repository: ArticleRepositoryInterface,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userId: string,
  ): Promise<Article> {
    const newArticle = {
      author: userId,
      content: createArticleDto.content,
    };
    const article = await this.article_repository.create(newArticle);

    return await this.article_repository.findOneById(article._id, {
      populate: populateAuthor,
    });
  }

  // TODO: get items by offset with id
  async findAllUsingKeyset(
    last_id?: string,
    limit?: number,
  ): Promise<Article[]> {
    let query = null;

    // Check id article is existing and add into query
    if (last_id && mongoose.Types.ObjectId.isValid(last_id)) {
      const existing_article =
        await this.article_repository.findOneById(last_id);
      if (existing_article) {
        query = {
          _id: {
            $gt: last_id,
          },
        };
      }
    }
    const protections = '';
    const populate = {
      populate: populateAuthor,
      limit,
      sort: { _id: 1 },
    };
    return await this.article_repository.findAll(query, protections, populate);
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
