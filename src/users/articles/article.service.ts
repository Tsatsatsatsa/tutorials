import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { Repository } from "typeorm";
import { CreateArticleDto } from "./create-article.dto";
import { UpdateArticleDto } from "./update-article.dto";

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article)
  private articleRepository: Repository<Article>) {

  }

  async createPost(createArticleDto: CreateArticleDto) {
    return await this.articleRepository.save(createArticleDto)
  }

  async getUserPosts(userId: number) {
    return await this.articleRepository.find({ where: { user: { id: userId } } })
  }


  // async updatePost(userId: number, updateArticleDto: UpdateArticleDto) {
  //   const user = await this.articleRepository.findOne({ where: { user: { id: userId } } })
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   // unda shemowmdes posti tu arsebobs da romeli posti davaapdeitot
  //   return await this.articleRepository.update(user.id, updateArticleDto)
  // }

  async removePost(articleId: number) {
    return await this.articleRepository.delete(articleId)
  }
}
