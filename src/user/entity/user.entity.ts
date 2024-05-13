import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../user.schema';

export class UserRo {
  id: string;
  username: string;
  email: string;
}
@Injectable()
export class UserEntity {
  public response(user): UserRo {
    const returnData: UserRo = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    return returnData;
  }

  public collection(users: UserDocument[]): UserRo[] {
    const returnData: UserRo[] = [];
    for (const user of users) {
      returnData.push(this.response(user));
    }
    return returnData;
  }
}
