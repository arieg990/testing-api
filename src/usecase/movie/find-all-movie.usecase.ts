import { Movie } from '@core/entity/movie.entity';
import { MovieDto } from '@domains/models/dto/movie.dto';
import { MovieModel } from '@domains/models/movie.model';
import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { FilterRequest } from '@domains/models/request/filter.request';

export class FindAllMovieUsecase
  implements IUsecase<FilterRequest, PaginatorDto<MovieDto>>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repository: BaseRepository<MovieModel, Movie>,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: FilterRequest): Promise<PaginatorDto<MovieDto>> {
    const option = {
      crypto: ['id'],
      cryptoService: this.cryptoService,
      func: 'toMovieDto',
    };
    request = { ...request, option };
    const result = await this.repository.findAll(request);
    this.logger.debug(FindAllMovieUsecase.name, 'find Movie List');
    return result;
  }
}
