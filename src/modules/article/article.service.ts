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
    private readonly articleRepository: ArticleRepositoryInterface,
  ) {}

  async ownerArticle(id: string, user_id: string): Promise<Article> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Article not found');
    }

    const article = await this.articleRepository.findOneById(id);

    if (!article) {
      throw new BadRequestException('Article not found');
    }

    const isAuthor = article.author.toString() === user_id;

    if (!isAuthor) {
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
      //TODO: handle async attachments with content
      attachments: createArticleDto.attachments,
    };
    const article = await this.articleRepository.create(newArticle);

    return await this.articleRepository.findOneById(article._id, {
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
      const existingArticle = await this.articleRepository.findOneById(last_id);
      if (existingArticle) {
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
    return await this.articleRepository.findAll(query, protections, populate);
  }

  async findOne(id: string) {
    return await this.articleRepository.findOneById(id, {
      populate: populateAuthor,
    });
  }

  async update(id: string, updateArticle: UpdateArticleDto, userId: string) {
    await this.ownerArticle(id, userId);
    return this.articleRepository.update(id, updateArticle);
  }

  async remove(id: string, userId: string) {
    await this.ownerArticle(id, userId);
    return this.articleRepository.permanentlyDelete(id);
  }
}
