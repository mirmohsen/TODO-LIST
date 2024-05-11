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

  private async findDuplicateEmail(email: string): Promise<boolean> {
    return this.UserModel.findOne({ email });
  }

  public async create(userDto: UserDto): Promise<User> {
    if (await this.findDuplicateEmail(userDto.email))
      throw new ForbiddenException('email not uniqe');

    return this.UserModel.create({
      ...userDto,
      password: this.cryptoService.hashPassword(userDto.password),
    });
  }

  public async get(): Promise<any> {
    return this.UserModel.find({}).select('_id username email');
  }
}
