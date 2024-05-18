import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    if (user) {
      // console.log(
      //   'equal pass ---->',
      //   this.cryptoService.hashPassword(payload.password) !==
      //     this.cryptoService.hashPassword(user.password),
      // );
      if (
        this.cryptoService.hashPassword(payload.password) !==
        this.cryptoService.hashPassword(user.password)
      ) {
        const payload = {};
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException();
    }
  }
}
