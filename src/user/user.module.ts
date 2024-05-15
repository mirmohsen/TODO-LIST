import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoService } from 'src/common/classes/utils.class';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, CryptoService, UserEntity],
  exports: [UserService],
})
export class UserModule {
  constructor() {}
}
