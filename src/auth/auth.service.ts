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
      if (this.cryptoService.hashPassword(payload.password) === user.password) {
        const payload = { email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException();
    }
  }
}
