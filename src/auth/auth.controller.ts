import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from './auth.guard';
import { UserSignUpDto } from './user-signUp.dto';
import { UserSignInDto } from './user-signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    await this.authService.signUp(userSignUpDto);
  }

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    return await this.authService.signIn(userSignInDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUser(@Request() req) {
    return req.user;
  }
}
