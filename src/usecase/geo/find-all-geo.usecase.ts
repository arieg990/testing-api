import { Geo } from '@core/entity/geo.entity';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { GeoModel } from '@domains/models/geo.model';
import { PaginatorDto } from '@domains/models/paginator/paginator.dto';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { FilterRequest } from '@domains/models/request/filter.request';

export class FindAllGeoUsecase
  implements IUsecase<FilterRequest, PaginatorDto<GeoDto>>
{
  constructor(
    private readonly logger: ILogger,
    private readonly repository: BaseRepository<GeoModel, Geo>,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: FilterRequest): Promise<PaginatorDto<GeoDto>> {
    const option = {
      crypto: ['id'],
      cryptoService: this.cryptoService,
      func: 'toGeoDto',
    };
    request = { ...request, option };
    const result = await this.repository.findAll(request);
    this.logger.debug(FindAllGeoUsecase.name, 'find Geo List');
    return result;
  }
}
