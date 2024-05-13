import { Controller, Body, Post, Get, Put, Param } from '@nestjs/common';
import { UpdateUserRo, UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRo, UserEntity } from './entity/user.entity';
import { UserDocument } from './user.schema';

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

  @Get('/get')
  async get(): Promise<UserRo[]> {
    return this.userEntity.collection(await this.userService.get());
  }

  @Put('/update')
  async update(@Body() body: UpdateUserRo): Promise<UserRo> {
    const updateUser = await this.userService.update(body);
    return this.userEntity.response(updateUser);
  }
}
