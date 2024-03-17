import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from '@domains/models/dto/login.dto';
import { UserDto } from '@domains/models/dto/user.dto';

export class LoginPresenter {
  @ApiProperty()
  user: UserDto;
  @ApiProperty({ example: '1234' })
  accessToken: string;
  @ApiProperty({ example: '1234' })
  refreshToken: string;

  constructor(loginResponse: LoginDto) {
    this.user = loginResponse.user;
    this.accessToken = loginResponse.accessToken;
    this.refreshToken = loginResponse.refreshToken;
  }
}
