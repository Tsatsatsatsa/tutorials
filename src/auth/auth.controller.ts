import { Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() user: CreateUserDto) {
        await this.authService.signUp(user)
    }

    @Post('signin')
    async signIn(@Body() user: any) {
        return await this.authService.signIn(user.email, user.password)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUser(@Request() req) {
        return req.user
    }

}


