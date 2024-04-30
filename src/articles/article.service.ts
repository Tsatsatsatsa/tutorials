import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async getArticlesByUserId(userId: number) {
    return await this.articleRepository.find({
      where: { user: { id: userId } },
    });
  }

  async getArticleById(articleId: number) {
    return await this.articleRepository.findOneOrFail({
      where: { id: articleId },
    });
  }

  async createArticle(articleToCreate: Article) {
    return await this.articleRepository.save(articleToCreate);
  }

  async removeArticle(articleId: number) {
    return await this.articleRepository.delete(articleId);
  }
}
