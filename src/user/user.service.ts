import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserRo, UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CryptoService } from 'src/common/classes/utils.class';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly cryptoService: CryptoService,
  ) {}

  private async findDuplicateEmail(email: string): Promise<boolean> {
    return this.UserModel.findOne({ email });
  }

  public async create(userDto: UserDto): Promise<User> {
    if (await this.findDuplicateEmail(userDto.email))
      throw new BadRequestException('email not uniqe');

    return this.UserModel.create({
      ...userDto,
      password: this.cryptoService.hashPassword(userDto.password),
    });
  }

  public get(page, limit): Promise<UserDocument[]> {
    return this.paginate(page, limit);
  }

  public paginate(page: number, limit: number): Promise<UserDocument[]> {
    return this.UserModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  public async update(body: UpdateUserRo): Promise<User> {
    const update = { ...body };

    if (body?.password)
      update['password'] = this.cryptoService.hashPassword(body.password);

    const result = await this.UserModel.findByIdAndUpdate(body._id, update, {
      new: true,
    });
    return result;
  }
}
