import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetApiClientRequest {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
