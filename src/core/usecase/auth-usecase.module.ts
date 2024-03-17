import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@core/config/environment/environment-config.module';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { ExceptionsService } from '@core/exceptions/exception.service';
import { UserRefreshTokenDbRepository } from '@core/repositories/user-refresh-token-db.repository';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';
import { CryptoModule } from '@core/services/crypto/crypto.module';
import { CryptoService } from '@core/services/crypto/crypto.service';
import { JwtTokenModule } from '@core/services/jwt/jwt-token.module';
import { JwtTokenService } from '@core/services/jwt/jwt-token.service';
import { GetUserWhenRefreshTokenUsecase } from '@usecase/auth/get-user-when-refresh-token.usecase';
import { LoginUsecase } from '@usecase/auth/login.usecase';
import { RegisterUsecase } from '@usecase/auth/register.usecase';
import { UserJwtUsecase } from '@usecase/auth/user-jwt.usecase';
import { CreateRefreshTokenJwtUsecase } from '@usecase/jwt/create-refresh-token-jwt.usecase';
import { CreateTokenJwtUsecase } from '@usecase/jwt/create-token-jwt.usecase';
import { LoggerModule } from '../logger/logger.module';
import { ExceptionsModule } from '../exceptions/exception.module';
import { RepositoriesModule } from '../repositories/repository.module';
import { UserDbRepository } from '../repositories/user-db.repository';
import { Usecase } from './usecase';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    LoggerModule,
    RepositoriesModule,
    ExceptionsModule,
    EnvironmentConfigModule,
    BcryptModule,
    CryptoModule,
    JwtTokenModule,
  ],
})
export class AuthUsecaseModule {
  static LOGIN_USECASES = 'loginUsecases';
  static REGISTER_USECASES = 'registerUsecases';
  static USER_JWT_USECASES = 'userJwtUsecases';
  static GET_USER_REFRESH_TOKEN_JWT_USECASES = 'getUserRefreshTokenJwtUsecases';
  static CREATE_TOKEN_JWT_USECASES = 'createTokenJwtUsecases';
  static CREATE_REFRESH_TOKEN_JWT_USECASES = 'createRefreshTokenJwtUsecases';

  static register(): DynamicModule {
    return {
      module: AuthUsecaseModule,
      providers: [
        {
          inject: [UserDbRepository, BcryptService, CryptoService],
          provide: this.LOGIN_USECASES,
          useFactory: (
            userDbRepository: UserDbRepository,
            bcryptService: BcryptService,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new LoginUsecase(userDbRepository, bcryptService, cryptoService),
            ),
        },
        {
          inject: [
            LoggerService,
            UserDbRepository,
            BcryptService,
            CryptoService,
            ExceptionsService,
          ],
          provide: this.REGISTER_USECASES,
          useFactory: (
            loggerService: LoggerService,
            userDbRepository: UserDbRepository,
            bcryptService: BcryptService,
            cryptoService: CryptoService,
            exceptionService: ExceptionsService,
          ) =>
            new Usecase(
              new RegisterUsecase(
                loggerService,
                userDbRepository,
                bcryptService,
                cryptoService,
                exceptionService,
              ),
            ),
        },
        {
          inject: [LoggerService, UserDbRepository, CryptoService],
          provide: this.USER_JWT_USECASES,
          useFactory: (
            loggerService: LoggerService,
            userDbRepository: UserDbRepository,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new UserJwtUsecase(
                loggerService,
                userDbRepository,
                cryptoService,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            UserDbRepository,
            UserRefreshTokenDbRepository,
            BcryptService,
            CryptoService,
          ],
          provide: this.GET_USER_REFRESH_TOKEN_JWT_USECASES,
          useFactory: (
            loggerService: LoggerService,
            userDbRepository: UserDbRepository,
            userRefreshTokenDbRepository: UserRefreshTokenDbRepository,
            bcryptService: BcryptService,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new GetUserWhenRefreshTokenUsecase(
                loggerService,
                userDbRepository,
                userRefreshTokenDbRepository,
                bcryptService,
                cryptoService,
              ),
            ),
        },
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService],
          provide: this.CREATE_TOKEN_JWT_USECASES,
          useFactory: (
            loggerService: LoggerService,
            jwtTokenService: JwtTokenService,
            jwtConfig: EnvironmentConfigService,
          ) =>
            new Usecase(
              new CreateTokenJwtUsecase(
                loggerService,
                jwtTokenService,
                jwtConfig,
              ),
            ),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            UserRefreshTokenDbRepository,
            EnvironmentConfigService,
            BcryptService,
            CryptoService,
          ],
          provide: this.CREATE_REFRESH_TOKEN_JWT_USECASES,
          useFactory: (
            loggerService: LoggerService,
            jwtTokenService: JwtTokenService,
            userRefreshTokenDbRepository: UserRefreshTokenDbRepository,
            jwtConfig: EnvironmentConfigService,
            bcryptService: BcryptService,
            cryptoService: CryptoService,
          ) =>
            new Usecase(
              new CreateRefreshTokenJwtUsecase(
                loggerService,
                jwtTokenService,
                userRefreshTokenDbRepository,
                jwtConfig,
                bcryptService,
                cryptoService,
              ),
            ),
        },
      ],
      exports: [
        this.LOGIN_USECASES,
        this.REGISTER_USECASES,
        this.USER_JWT_USECASES,
        this.GET_USER_REFRESH_TOKEN_JWT_USECASES,
        this.CREATE_TOKEN_JWT_USECASES,
        this.CREATE_REFRESH_TOKEN_JWT_USECASES,
      ],
    };
  }
}
