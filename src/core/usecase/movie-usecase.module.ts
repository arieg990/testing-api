import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '@core/exceptions/exception.module';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { MovieDbRepository } from '@core/repositories/movie-db.repository';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { CryptoModule } from '@core/services/crypto/crypto.module';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { CreateMovieUsecase } from '@usecase/movie/create-movie.usecase';
import { FindAllMovieUsecase } from '@usecase/movie/find-all-movie.usecase';
import { FindByIdMovieUsecase } from '@usecase/movie/find-by-id-movie.usecase';
import { UpdateMovieUsecase } from '@usecase/movie/update-movie.usecase';
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
export class MovieUsecaseModule {
  static CREATE_MOVIE_USECASES = 'createMovieUsecases';
  static FIND_ALL_MOVIE_USECASES = 'findAllMovieUsecases';
  static FIND_BY_ID_MOVIE_USECASES = 'findByIdMovieUsecases';
  static UPDATE_MOVIE_USECASES = 'updateMovieUsecases';

  static register(): DynamicModule {
    return {
      module: MovieUsecaseModule,
      providers: [
        {
          inject: [LoggerService, MovieDbRepository, CryptoService],
          provide: this.CREATE_MOVIE_USECASES,
          useFactory: (
            loggerService: LoggerService,
            movieDbRepository: MovieDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new CreateMovieUsecase(
                loggerService,
                movieDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            MovieDbRepository,
            CryptoService,
          ],
          provide: this.UPDATE_MOVIE_USECASES,
          useFactory: (
            loggerService: LoggerService,
            exceptionsService: ExceptionsService,
            movieDbRepository: MovieDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new UpdateMovieUsecase(
                loggerService,
                exceptionsService,
                movieDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            MovieDbRepository,
            CryptoService,
          ],
          provide: this.FIND_ALL_MOVIE_USECASES,
          useFactory: (
            loggerService: LoggerService,
            movieDbRepository: MovieDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindAllMovieUsecase(
                loggerService,
                movieDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            MovieDbRepository,
            CryptoService,
          ],
          provide: this.FIND_BY_ID_MOVIE_USECASES,
          useFactory: (
            loggerService: LoggerService,
            exceptionsService: ExceptionsService,
            movieDbRepository: MovieDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindByIdMovieUsecase(
                loggerService,
                exceptionsService,
                movieDbRepository,
                cryptoService,
              ),
            ),
        },
      ],
      exports: [
        this.CREATE_MOVIE_USECASES,
        this.FIND_ALL_MOVIE_USECASES,
        this.FIND_BY_ID_MOVIE_USECASES,
        this.UPDATE_MOVIE_USECASES,
      ],
    };
  }
}
