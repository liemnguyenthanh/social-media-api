import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private readonly _articleModel: Model<ArticleDocument>
  ) { }

  create(createArticleDto: CreateArticleDto) {
    return createArticleDto;
  }

  findAll() {
    return this._articleModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
