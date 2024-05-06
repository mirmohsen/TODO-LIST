// cats.service.ts
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  create(userDto: UserDto) {
    console.log(userDto);
  }
}
