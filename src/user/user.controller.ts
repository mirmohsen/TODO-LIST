// cats.controller.ts
import { Controller, Body, Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('cats')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create(@Body() userDto: UserDto) {
    this.userService.create(userDto);
  }
}
