import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Gender } from '@domains/enums/gender.enum';
import { UserModel } from '@domains/models/user/user.model';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserSimpleDto } from '@domains/models/dto/user-simple.dto';
import { ICryptoService } from '@domains/services/crypto-service.interface';

@Table({
  modelName: 'users',
  underscored: true,
})
export class User extends Model<UserModel> {
  @Column
  name: string;

  @Column(DataType.DATEONLY)
  dob: string;

  @Column(DataType.ENUM(...Object.values(Gender)))
  gender: Gender;

  @Column({
    unique: true,
  })
  username: string;

  @Column
  password: string;

  toUserModel(): UserModel {
    const user = new UserModel();
    user.id = this.id.toString();
    user.name = this.name;
    user.dob = this.dob;
    user.gender = this.gender;
    user.username = this.username;
    user.createdAt = this.createdAt;
    user.updatedAt = this.updatedAt;
    return user;
  }

  async toUserDto(cryptoService: ICryptoService): Promise<UserDto> {
    return {
      id: await cryptoService.encrypt(this.id.toString()),
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      username: this.username,
    };
  }

  toUserSimpleDTO(): UserSimpleDto {
    return {
      id: this.id.toString(),
      name: this.name,
      dob: this.dob,
      gender: this.gender,
    };
  }
}
