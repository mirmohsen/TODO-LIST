import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CryptoService } from 'src/common/classes/utils.class';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGaurd } from './auth.gaurd';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '5m' },
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, AuthGaurd],
  exports: [AuthGaurd, JwtModule],
})
export class AuthModule {}
