import { JwtRefreshTokenStrategy } from '@core/common/strategies/jwt-refresh.strategy';
import { JwtStrategy } from '@core/common/strategies/jwt.strategy';
import { LocalStrategy } from '@core/common/strategies/local.strategy';
import { LoginBasicStrategy } from '@core/common/strategies/login-basic.strategy';
import { EnvironmentConfigModule } from '@core/config/environment/environment-config.module';
import { AuthControllerModule } from '@core/controller/auth/auth-controller.module';
import { GeoControllerModule } from '@core/controller/geo/geo-controller.module';
import { MovieControllerModule } from '@core/controller/movie/movie-controller.module';
import { DatabaseModule } from '@core/database/database.module';
import { ExceptionsModule } from '@core/exceptions/exception.module';
import { LoggerModule } from '@core/logger/logger.module';
import { RepositoriesModule } from '@core/repositories/repository.module';
import { BcryptModule } from '@core/services/bcrypt/bcrypt.module';
import { CryptoModule } from '@core/services/crypto/crypto.module';
import { JwtTokenModule } from '@core/services/jwt/jwt-token.module';
import { ApiClientUsecaseModule } from '@core/usecase/api-client-usecase.module';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { GeoUsecaseModule } from '@core/usecase/geo-usecase.module';
import { UserUsecaseModule } from '@core/usecase/user-usecase.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          {
            path: 'movies',
            module: MovieControllerModule,
          },
          {
            path: 'geo',
            module: GeoControllerModule,
          },
        ],
      },
    ]),
    LoggerModule,
    ExceptionsModule,
    ApiClientUsecaseModule.register(),
    UserUsecaseModule.register(),
    AuthUsecaseModule.register(),
    GeoUsecaseModule.register(),
    BcryptModule,
    CryptoModule,
    RepositoriesModule,
    JwtTokenModule,
    EnvironmentConfigModule,
    DatabaseModule,
    AuthControllerModule,
    MovieControllerModule,
    GeoControllerModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    BasicStrategy,
    LoginBasicStrategy,
  ],
})
export class AppModule {}
