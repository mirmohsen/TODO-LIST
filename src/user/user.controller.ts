import { Controller, Body, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRo, UserEntity } from './entity/user.entity';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userEntity: UserEntity,
  ) {}

  @Post('/create')
  async create(@Body() userDto: UserDto): Promise<UserRo> {
    const createdUser = await this.userService.create(userDto);
    return await this.userEntity.response(createdUser);
  }
}
