import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CryptoService } from 'src/common/classes/utils.class';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  private async findEamilDup(email: string): Promise<boolean> {
    return !!this.UserModel.findOne({ email });
  }

  public async create(userDto: UserDto): Promise<User> {
    if (await this.findEamilDup(userDto.email))
      throw new ForbiddenException('email not uniqe');
    return this.UserModel.create({
      ...userDto,
      password: this.cryptoService.hashPassword(userDto.password),
    });
  }
}
