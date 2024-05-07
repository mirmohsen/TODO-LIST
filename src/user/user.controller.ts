import { Controller, Body, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CryptoService } from '../common/classes/utils.class';

@Controller('cats')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userDto: UserDto) {
    this.userService.create(userDto);
  }
}
