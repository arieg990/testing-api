import { Movie } from '@core/entity/movie.entity';
import { IException } from '@domains/exception/exceptions.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { MovieModel } from '@domains/models/movie.model';
import { UpdateMovieRequest } from '@domains/models/request/update-movie.request';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { CryptoService } from '@core/services/crypto/crypto.service';

export class UpdateMovieUsecase
  implements IUsecase<UpdateMovieRequest, MovieDto>
{
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: IException,
    private readonly movieRepository: BaseRepository<MovieModel, Movie>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: UpdateMovieRequest): Promise<MovieDto> {
    const idDecrypt = await this.cryptoService.decrypt(request.id);
    const id = Number.parseInt(idDecrypt);
    if (Number.isNaN(id)) {
      this.exceptionService.badRequestException({
        message: 'Failed update user',
      });
    }

    const user = await this.movieRepository.update(id, request.toMovieModel());
    this.logger.debug(UpdateMovieUsecase.name, 'movie updated');
    return user.toMovieDto(this.cryptoService);
  }
}
