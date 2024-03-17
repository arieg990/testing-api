import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '@core/exceptions/exception.module';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';
import { CryptoModule } from '@core/services/crypto/crypto.module';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { FindAllUserUsecase } from '@usecase/user/find-all-user.usecase';
import { FindByIdUserUsecase } from '@usecase/user/find-by-id-user.usecase';
import { UpdateUserUsecase } from '@usecase/user/update-user.usecase';
import { UsernameRegisteredUserUsecase } from '@usecase/user/username-registered-user.usecase';
import { LoggerModule } from '../logger/logger.module';
import { RepositoriesModule } from '../repositories/repository.module';
import { UserDbRepository } from '../repositories/user-db.repository';
import { Usecase } from './usecase';
import { CreateUserUsecase } from '@usecase/user/create-user.usecase';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [LoggerModule, ExceptionsModule, RepositoriesModule, BcryptModule, CryptoModule],
})
export class UserUsecaseModule {
  static CREATE_USER_USECASES = 'createUserUsecases';
  static FIND_ALL_USER_USECASES = 'findAllUserUsecases';
  static FIND_BY_ID_USER_USECASES = 'findByIdUserUsecases';
  static UPDATE_USER_USECASES = 'updateUserUsecases';
  static USERNAME_REGISTERED_USER_USECASES = 'usernameRegisteredUsecases';

  static register(): DynamicModule {
    return {
      module: UserUsecaseModule,
      providers: [
        {
          inject: [
            LoggerService,
            UserDbRepository,
            BcryptService,
            CryptoService,
          ],
          provide: this.CREATE_USER_USECASES,
          useFactory: (
            loggerService: LoggerService,
            userDbRepository: UserDbRepository,
            bcryptService: BcryptService,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new CreateUserUsecase(
                loggerService,
                userDbRepository,
                cryptoService,
                bcryptService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            UserDbRepository,
            CryptoService,
          ],
          provide: this.UPDATE_USER_USECASES,
          useFactory: (
            loggerService: LoggerService,
            exceptionsService: ExceptionsService,
            userDbRepository: UserDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new UpdateUserUsecase(
                loggerService,
                exceptionsService,
                userDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [LoggerService, UserDbRepository, CryptoService],
          provide: this.FIND_ALL_USER_USECASES,
          useFactory: (
            loggerService: LoggerService,
            userDbRepository: UserDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindAllUserUsecase(
                loggerService,
                userDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            ExceptionsService,
            UserDbRepository,
            CryptoService,
          ],
          provide: this.FIND_BY_ID_USER_USECASES,
          useFactory: (
            loggerService: LoggerService,
            exceptionsService: ExceptionsService,
            userDbRepository: UserDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new FindByIdUserUsecase(
                loggerService,
                exceptionsService,
                userDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [UserDbRepository],
          provide: this.USERNAME_REGISTERED_USER_USECASES,
          useFactory: (userDbRepository: UserDbRepository) =>
            new Usecase(new UsernameRegisteredUserUsecase(userDbRepository)),
        },
      ],
      exports: [
        this.CREATE_USER_USECASES,
        this.FIND_ALL_USER_USECASES,
        this.FIND_BY_ID_USER_USECASES,
        this.UPDATE_USER_USECASES,
        this.USERNAME_REGISTERED_USER_USECASES,
      ],
    };
  }
}
