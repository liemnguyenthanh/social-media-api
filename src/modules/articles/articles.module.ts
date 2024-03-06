import { Module } from '@nestjs/common';
import { ArticleService } from './articles.service';
import { ArticleController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './entities/article.entity';
import { ArticleRepository } from '../../repositories/articles.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    { provide: 'ArticleRepositoryInterfaceModel', useClass: ArticleRepository },
  ],
})
export class ArticleModule {}
