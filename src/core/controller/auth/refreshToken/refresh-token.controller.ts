import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtRefreshGuard } from '@core/common/guards/jwt-refresh.guard';
import {
  ResponseMessage,
  ResponseMessageDecorator,
} from '@core/common/interceptors/response.decorator';
import { ApiFailedResponseType } from '@core/common/swagger/failed-response.decorator';
import { ApiResponseType } from '@core/common/swagger/response.decorator';
import { AuthUsecaseModule } from '@core/usecase/auth-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { UserDto } from '@domains/models/dto/user.dto';
import { RefreshTokenRequest } from '@domains/models/request/refresh-token.request';
import { UserModel } from '@domains/models/user/user.model';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller('auth')
@ApiTags('Auth')
@UseGuards(JwtRefreshGuard)
@ApiBearerAuth()
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@ApiExtraModels(UserDto)
export class RefreshTokenController {
  constructor(
    @Inject(AuthUsecaseModule.CREATE_TOKEN_JWT_USECASES)
    private readonly createTokenJwtUsecaseUsecase: Usecase<
      IUsecase<string, string>
    >,
    @Inject(AuthUsecaseModule.CREATE_REFRESH_TOKEN_JWT_USECASES)
    private readonly createRefreshTokenJwtUsecaseUsecase: Usecase<
      IUsecase<RefreshTokenRequest, string>
    >,
  ) {}

  @Get('refresh')
  @ApiResponseType(UserDto, false)
  @ResponseMessage(ResponseMessageDecorator.RESULT_OK)
  async refresh(@Req() request: Request) {
    const user = request.user as UserModel;
    const accessToken = await this.createTokenJwtUsecaseUsecase
      .getInstance()
      .execute(user.username);
    const refreshToken = await this.createRefreshTokenJwtUsecaseUsecase
      .getInstance()
      .execute({
        username: user.username,
        userId: user.id,
      });
    return {
      user: user,
      accessToken,
      refreshToken,
    };
  }
}
