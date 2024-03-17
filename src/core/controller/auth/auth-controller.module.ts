import { Module } from '@nestjs/common';
import { LoginController } from '@core/controller/auth/login/login.controller';
import { RefreshTokenController } from '@core/controller/auth/refreshToken/refresh-token.controller';
import { RegisterController } from '@core/controller/auth/register/register.controller';
import { ApiClientUsecaseModule } from '@core/usecase/api-client-usecase.module';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { UserUsecaseModule } from '@core/usecase/user-usecase.module';

@Module({
  imports: [
    AuthUsecaseModule.register(),
    ApiClientUsecaseModule.register(),
    UserUsecaseModule.register(),
  ],
  controllers: [LoginController, RegisterController, RefreshTokenController],
})
export class AuthControllerModule {}
