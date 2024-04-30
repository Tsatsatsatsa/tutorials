import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDto } from './user-signIn.dto';
import { UserSignUpDto } from './user-signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: userSignUpDto.email },
    });
    if (existingUser) throw new Error('user is exist');
    this.usersRepository.save({
      email: userSignUpDto.email,
      password: await bcrypt.hash(userSignUpDto.password, 10),
    });
  }

  async signIn(userSignInDto: UserSignInDto) {
    const user = await this.usersRepository.findOne({
      where: { email: userSignInDto.email },
    });
    if (
      !user ||
      !(await bcrypt.compare(userSignInDto.password, user.password))
    ) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
