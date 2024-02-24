import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FindAllResponse } from 'src/repositories/base.interface.repository';
import { ArticleRepositoryInterface } from './article.interface';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('ArticleRepositoryInterface')
    private readonly article_repository: ArticleRepositoryInterface
  ) { }

  populateAuthor = {
    path: 'author',
    select: ['_id', 'username']
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    // FIXME: add user when app has the token
    const newArticle = {
      author: '65d6d1421d65dc45e31288ab',
      content: createArticleDto.content,
    }
    const article = await this.article_repository.create(newArticle);
    const condition = {
      _id: article._id
    }
    const projection = ''
    return await this.article_repository.findWithSubFields(condition, projection, this.populateAuthor)
  }

  async findAll(filter?: object, projection?: string): Promise<FindAllResponse<Article>> {
    return await this.article_repository.findAllWithSubFields(filter, projection, this.populateAuthor)
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
