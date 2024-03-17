import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginUserRequest {
  @ValidateIf((obj) => obj.key == 'username' && obj.value == 'guest')
  @IsEmail()
  @ApiProperty({
    examples: ['admin@admin.com', 'guest'],
    example: 'admin@admin.com',
  })
  username: string;

  @ValidateIf((obj) => obj.key == 'username' && obj.value == 'guest')
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain upper and lower case letters',
  })
  @ApiProperty({
    example: 'Secret123',
    description: 'Password not required if username is guest',
  })
  password: string;
}
