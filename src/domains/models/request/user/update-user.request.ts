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

export class UpdateUserRequest {
  id: string;
  name: string;
  dob: string;
  gender: Gender;

  toUserModel(): UserModel {
    const user = new UserModel();
    user.name = this.name;
    user.dob = this.dob;
    user.gender = this.gender;
    return user;
  }
}
