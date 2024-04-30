import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateArticleDto } from './create-article.dto';
import { ArticleService } from './article.service';
import { UpdateArticleDto } from './update-article.dto';

@Controller('user/posts')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post()
    async createPost(@Body() createArticleDto: CreateArticleDto) {
        return await this.articleService.createPost(createArticleDto)
    }

    @Get(':id') // droebit
    async getUserPosts(@Param('id') userId: number) {
        return await this.articleService.getUserPosts(userId)
    }
    // articles id unda gamovgzavnot
    // @Put(':id')
    // async updatePost(@Param('id') id: number, @Body() updateArticleDto: UpdateArticleDto) {
    //     return await this.articleService.updatePost(id, updateArticleDto)
    // }

    @Delete(':id')
    async removePost(@Param('id') articleId: number) {
        return await this.articleService.removePost(articleId)

    }

}
