import { UserDto } from '@domains/models/dto/user.dto';

export class LoginDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
