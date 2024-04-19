import { Module } from '@nestjs/common';
import { UserModule } from './users/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'tutorial_1',
    entities: [User],
    synchronize: true,
  }),UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
