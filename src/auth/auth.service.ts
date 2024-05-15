import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/common/classes/utils.class';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(payload: AuthDto): Promise<any> {
    const user = await this.userService.findOneUser(payload);

    if (
      this.cryptoService.hashPassword(String(user.password?.password)) ===
      this.cryptoService.hashPassword(String(payload.password))
    ) {
      throw new UnauthorizedException();
    }
    return 'logined';
    // const { password, ...result } = user;

    // return result;
  }
}
