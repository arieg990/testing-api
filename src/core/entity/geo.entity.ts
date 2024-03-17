import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@core/entity/user.entity';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { GeoModel } from '@domains/models/geo.model';
import { ICryptoService } from '@domains/services/crypto-service.interface';

@Table({
  modelName: 'geo',
  underscored: true,
})
export class Geo extends Model<GeoModel> {
  @Column
  file_path: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  async toGeoDto(cryptoService: ICryptoService): Promise<GeoDto> {
    const [id, user_id] = await Promise.all([
      cryptoService.encrypt(this.id.toString()),
      cryptoService.encrypt(this.user_id.toString()),
    ]);
    return {
      id,
      user_id,
      file_path: this.file_path,
    };
  }
}
