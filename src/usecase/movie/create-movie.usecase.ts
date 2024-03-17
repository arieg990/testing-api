import { Movie } from '@core/entity/movie.entity';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { ILogger } from '@domains/logger/logger.interface';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { MovieModel } from '@domains/models/movie.model';
import { CreateMovieRequest } from '@domains/models/request/create-movie.request';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class CreateMovieUsecase
  implements IUsecase<CreateMovieRequest, MovieDto>
{
  constructor(
    private readonly logger: ILogger,
    private readonly movieRepository: BaseRepository<MovieModel, Movie>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: CreateMovieRequest): Promise<MovieDto> {
    const movie = await this.movieRepository.create(request.toMovieModel());
    const movieDto = await movie.toMovieDto(this.cryptoService);
    this.logger.debug(CreateMovieUsecase.name, 'movie created');
    return movieDto;
  }
}
