import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '@core/exceptions/exception.module';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { GeoDbRepository } from '@core/repositories/geo-db.repository';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { CryptoModule } from '@core/services/crypto/crypto.module';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { FindAllGeoUsecase } from '@usecase/geo/find-all-geo.usecase';
import { FindByIdGeoUsecase } from '@usecase/geo/find-by-id-geo.usecase';
import { UploadGeoUsecase } from '@usecase/geo/upload-geo.usecase';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repository.module';
import { Usecase } from './usecase';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    BcryptModule,
    CryptoModule,
  ],
})
export class GeoUsecaseModule {
  static UPLOAD_GEO_USECASES = 'uploadGeoUsecases';
  static FIND_ALL_GEO_USECASES = 'findAllGeoUsecases';
  static FIND_BY_ID_GEO_USECASES = 'findByIdGeoUsecases';

  static register(): DynamicModule {
    return {
      module: GeoUsecaseModule,
      providers: [
        {
          inject: [LoggerService, GeoDbRepository, CryptoService],
          provide: this.UPLOAD_GEO_USECASES,
          useFactory: (
            loggerService: LoggerService,
            geoDbRepository: GeoDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new UploadGeoUsecase(
                loggerService,
                geoDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [LoggerService, GeoDbRepository, CryptoService],
          provide: this.FIND_ALL_GEO_USECASES,
          useFactory: (
            loggerService: LoggerService,
            geoDbRepository: GeoDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindAllGeoUsecase(
                loggerService,
                geoDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            GeoDbRepository,
            CryptoService,
          ],
          provide: this.FIND_BY_ID_GEO_USECASES,
          useFactory: (
            loggerService: LoggerService,
            exceptionsService: ExceptionsService,
            geoDbRepository: GeoDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindByIdGeoUsecase(
                loggerService,
                exceptionsService,
                geoDbRepository,
                cryptoService,
              ),
            ),
        },
      ],
      exports: [
        this.UPLOAD_GEO_USECASES,
        this.FIND_ALL_GEO_USECASES,
        this.FIND_BY_ID_GEO_USECASES,
      ],
    };
  }
}
