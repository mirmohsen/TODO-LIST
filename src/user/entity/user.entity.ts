import { Injectable } from '@nestjs/common';

export class UserRo {
  username: string;
  email: string;
}
@Injectable()
export class UserEntity {
  public async response(user) {
    const returnData: UserRo = {
      username: user.username,
      email: user.email,
    };

    return await returnData;
  }
}
