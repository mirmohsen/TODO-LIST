import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CryptoService } from 'src/common/classes/utils.class';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
})
export class AuthModule {}
