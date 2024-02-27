import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { FindAllResponse } from 'src/repositories/base.interface.repository';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('article')
@UseInterceptors(MongooseClassSerializerInterceptor(Article))
@ApiTags('Articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    const userId = req.user.userId;
    return this.articleService.create(createArticleDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<FindAllResponse<Article>> {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.articleService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
