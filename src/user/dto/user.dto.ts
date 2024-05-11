import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Length(4, 20)
  readonly username: string;
  @Length(4, 20)
  readonly password: string;
  @IsEmail()
  readonly email: string;
}
