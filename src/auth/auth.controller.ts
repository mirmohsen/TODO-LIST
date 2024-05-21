import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGaurd } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() authDto: AuthDto): Promise<any> {
    return this.authService.signIn(authDto);
  }

  @Get('/get')
  @UseGuards(AuthGaurd)
  async hello() {
    return 'hello';
  }
}
