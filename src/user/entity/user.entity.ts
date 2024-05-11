import { Injectable } from '@nestjs/common';

export class UserRo {
  id: string;
  username: string;
  email: string;
}
@Injectable()
export class UserEntity {
  public async response(user) {
    const returnData: UserRo = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return await returnData;
  }
}
