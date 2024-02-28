import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ArticleRepositoryInterface } from './article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('ArticleRepositoryInterface')
    private readonly article_repository: ArticleRepositoryInterface,
  ) {}

  populateAuthor = {
    path: 'author',
    select: ['_id', 'username', 'full_name'],
  };

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
      populate: {
        ...this.populateAuthor,
      },
    });
  }

  // TODO: get items by offset with id
  async findAll(filter?: object): Promise<Article[]> {
    return await this.article_repository.findAll(filter, '', {
      populate: {
        path: 'author',
        select: ['_id', 'username', 'full_name'],
      },
    });
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
