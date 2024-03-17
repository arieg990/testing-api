import { Geo } from '@core/entity/geo.entity';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { ILogger } from '@domains/logger/logger.interface';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { GeoModel } from '@domains/models/geo.model';
import { UploadGeoRequest } from '@domains/models/request/geo/upload-geo.request';
import { BaseRepository } from '@domains/repositories/base-repository.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export class UploadGeoUsecase implements IUsecase<UploadGeoRequest, GeoDto> {
  constructor(
    private readonly logger: ILogger,
    private readonly repository: BaseRepository<GeoModel, Geo>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(request: UploadGeoRequest): Promise<GeoDto> {
    const path = 'uploads/geo/';
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
    const location = `${path}${request.file.originalname.replace(' ', '_')}`;
    writeFileSync(location, request.file.buffer);
    const result = await this.repository.create(
      await request.toGeoModel(this.cryptoService, location),
    );
    const dto = result.toGeoDto(this.cryptoService);
    this.logger.debug(UploadGeoUsecase.name, 'geo uploaded');
    return dto;
  }
}
