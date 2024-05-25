import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeleteUserRo, UpdateUserRo, UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRo, UserEntity } from './entity/user.entity';
import { AuthGaurd } from 'src/auth/auth.gaurd';

@Controller('/user')
@UseGuards(AuthGaurd)
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
  async get(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<UserRo[]> {
    return this.userEntity.collection(await this.userService.get(page, limit));
  }

  @Put('/update')
  async update(@Body() body: UpdateUserRo): Promise<UserRo> {
    const updateUser = await this.userService.update(body);
    return this.userEntity.response(updateUser);
  }

  @Delete('/remove')
  async delete(@Body() body: DeleteUserRo): Promise<DeleteUserRo> {
    return this.userService.delete(body);
  }
}
