import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { Gender } from '@domains/enums/gender.enum';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { MovieModel } from '@domains/models/movie.model';
import { UserModel } from '@domains/models/user/user.model';
import { UserDto } from '@domains/models/dto/user.dto';
import { UserSimpleDto } from '@domains/models/dto/user-simple.dto';
import moment from 'moment';
import { ICryptoService } from '@domains/services/crypto-service.interface';

@Table({
  modelName: 'movies',
  underscored: true,
})
export class Movie extends Model<MovieModel> {
  @Column
  name: string;

  @Column
  description: string;

  async toMovieDto(cryptoService: ICryptoService): Promise<MovieDto> {
    return {
      id: await cryptoService.encrypt(this.id.toString()),
      name: this.name,
      description: this.description,
    };
  }
}
