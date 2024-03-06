import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ArticleService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

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
  findAll(
    @Query('last_id') last_id: string,
    @Query('limit', ParseIntPipe) limit: string,
  ): Promise<Article[]> {
    return this.articleService.findAllUsingKeyset(last_id, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticle: UpdateArticleDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.articleService.update(id, updateArticle, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return { delete: this.articleService.remove(id, userId) };
  }
}
