import { Controller, Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userDto: UserDto) {}

  @Get('/usr')
  getUser() {
    console.log(this.userDto);
  }
}
