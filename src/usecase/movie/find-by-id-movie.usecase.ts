import { Movie } from '@core/entity/movie.entity';
import { IException } from '@domains/exception/exceptions.interface';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { ILogger } from '@domains/logger/logger.interface';
import { MovieModel } from '@domains/models/movie.model';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { CryptoService } from '@core/services/crypto/crypto.service';

export class FindByIdMovieUsecase implements IUsecase<string, MovieDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: IException,
    private readonly movieRepository: BaseRepository<MovieModel, Movie>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: string): Promise<MovieDto> {
    const idDecrypt = await this.cryptoService.decrypt(request);
    const id = Number.parseInt(idDecrypt);
    if (Number.isNaN(id)) {
      this.exceptionService.notFoundException();
    }

    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      this.exceptionService.notFoundException();
    }
    const movieDto = movie.toMovieDto(this.cryptoService);
    this.logger.debug(FindByIdMovieUsecase.name, 'find movie by id');
    return movieDto;
  }
}
