import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from '@core/entity/user.entity';
import { UserRefreshTokenModel } from '@domains/models/user/user-refresh-token.model';

@Table({
  modelName: 'user_refresh_tokens',
  underscored: true,
})
export class UserRefreshToken extends Model<UserRefreshTokenModel> {
  @ForeignKey(() => User)
  @Unique
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.TEXT)
  token: string;
}
