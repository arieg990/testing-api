import { Gender } from '../../enums/gender.enum';

export class UserModel {
  id: string;
  name: string;
  dob: string;
  gender: Gender;
  password: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
