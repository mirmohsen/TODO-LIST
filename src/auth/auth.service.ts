import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/common/classes/utils.class';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(payload: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneUser(payload);

    if (!user) throw new UnauthorizedException();

    const isPasswordCorrect =
      (await this.cryptoService.hashPassword(payload.password)) ===
      user.password;
    if (!isPasswordCorrect) throw new UnauthorizedException();

    const returnData = { id: user._id };
    return {
      ...returnData,
      access_token: this.jwtService.sign(payload),
    };
  }
}
