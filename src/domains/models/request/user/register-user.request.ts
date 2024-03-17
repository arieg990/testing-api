import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from '@core/common/validator/match.decorator';
import { Gender } from '@domains/enums/gender.enum';
import { UserModel } from '@domains/models/user/user.model';

export class RegisterUserRequest {
  @IsEmail()
  @ApiProperty({
    examples: ['admin@admin.com', 'guest'],
    example: 'admin@admin.com',
  })
  username: string;

  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password must contain upper and lower case letters',
  })
  @ApiProperty({
    example: 'Secret123',
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'Admin',
  })
  name: string;

  @IsEnum(Gender)
  @ApiProperty({
    example: 'l',
  })
  gender: Gender;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @ApiProperty({
    example: '2022-01-31',
  })
  dob: string;

  @Match('password')
  @ApiProperty({
    example: 'Secret123',
  })
  confirmPassword: string;
}
