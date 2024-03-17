import { Geo } from '@core/entity/geo.entity';
import { IException } from '@domains/exception/exceptions.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { GeoModel } from '@domains/models/geo.model';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { CryptoService } from '@core/services/crypto/crypto.service';

export class FindByIdGeoUsecase implements IUsecase<string, GeoDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: IException,
    private readonly userRepository: BaseRepository<GeoModel, Geo>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: string): Promise<GeoDto> {
    const idDecrypt = await this.cryptoService.decrypt(request);
    const id = Number.parseInt(idDecrypt);
    if (Number.isNaN(id)) {
      this.exceptionService.notFoundException();
    }
    const user = await this.userRepository.getById(id);
    if (!user) {
      this.exceptionService.notFoundException();
    }

    const userDto = user.toGeoDto(this.cryptoService);
    this.logger.debug(FindByIdGeoUsecase.name, 'find Geo by id');
    return userDto;
  }
}
