import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ArticleRepositoryInterface } from './article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

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

  async ownerArticle(id: string, user_id: string): Promise<Article> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Article not found');
    }

    const article = await this.article_repository.findOneById(id);

    if (!article) {
      throw new BadRequestException('Article not found');
    }

    const is_author = article.author.toString() === user_id;

    if (!is_author) {
      throw new BadRequestException('User is not the author of the article');
    }

    return article;
  }

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

  async findOne(id: string) {
    return await this.article_repository.findOneById(id, {
      populate: populateAuthor,
    });
  }

  async update(id: string, updateArticle: UpdateArticleDto, userId: string) {
    await this.ownerArticle(id, userId);
    return this.article_repository.update(id, updateArticle);
  }

  async remove(id: string, userId: string) {
    await this.ownerArticle(id, userId);
    return this.article_repository.permanentlyDelete(id);
  }
}
