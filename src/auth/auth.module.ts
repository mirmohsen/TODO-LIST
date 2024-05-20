import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CryptoService } from 'src/common/classes/utils.class';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '5m' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService],
})
export class AuthModule {}
