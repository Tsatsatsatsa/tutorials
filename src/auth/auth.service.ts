import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/create-user.dto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private usersRepository: Repository<User>, private readonly jwtService: JwtService) { }

    async signUp(user: CreateUserDto) {
        const newUser = await this.usersRepository.findOne({ where: { email: user.email } })
        if (newUser) throw new Error('user is exist')
        this.usersRepository.save({
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        })

    }

    async signIn(userEmail: string, userPassword: string) {
        const user = await this.usersRepository.findOne({ where: { email: userEmail } })
        if (!user || !await bcrypt.compare(userPassword, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user}
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
