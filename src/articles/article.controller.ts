import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  // Put,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto';
import { ArticleService } from './article.service';
// import { UpdateArticleDto } from './update-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/types/authenticated-request';
import { Article } from './article.entity';

@Controller('/articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  async getAllArticles() {}

  @UseGuards(AuthGuard)
  @Get('/my')
  async getAuthUserArticles(@Req() request: AuthenticatedRequest) {
    return await this.articleService.getArticlesByUserId(request.user.id);
  }

  @Get('/:articleId')
  async getArticle(@Param('articleId') articleId: number) {
    return await this.articleService.getArticleById(articleId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @Req() request: AuthenticatedRequest,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const articleToCreate = new Article();
    articleToCreate.title = createArticleDto.title;
    articleToCreate.body = createArticleDto.body;
    articleToCreate.user = request.user;

    return await this.articleService.createArticle(articleToCreate);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeArticle(@Param('id') articleId: number) {
    return await this.articleService.removeArticle(articleId);
  }
}
