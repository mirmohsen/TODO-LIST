import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @Length(4, 20)
  password: string;

  @IsEmail()
  email: string;
}

export class UpdateUserRo {
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsOptional()
  username: string;

  @Length(4, 20)
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
