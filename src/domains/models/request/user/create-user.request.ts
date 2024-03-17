import { Gender } from '@domains/enums/gender.enum';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { UserModel } from '@domains/models/user/user.model';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsDate()
  dob: string;

  @IsNotEmpty()
  gender: Gender;

  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(6)
  @Matches('password')
  confirmPassword: string;

  toUserModel(): UserModel {
    const user = new UserModel();
    user.name = this.name;
    user.dob = this.dob;
    user.gender = this.gender;
    user.username = this.username;
    user.password = this.password;
    return user;
  }
}
