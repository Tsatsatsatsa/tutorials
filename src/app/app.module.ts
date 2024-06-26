import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/users/user.module';
import { Article } from 'src/articles/article.entity';
import { ArticleModule } from 'src/articles/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tutorial_1',
      entities: [User, Article],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
