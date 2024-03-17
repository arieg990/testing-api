import { UserRefreshTokenDbRepository } from '@core/repositories/user-refresh-token-db.repository';
import { ILogger } from '@domains/logger/logger.interface';
import { UserDto } from '@domains/models/dto/user.dto';
import { RefreshTokenUserRequest } from '@domains/models/request/refresh-token-user.request';
import { UserRepository } from '@domains/repositories/user-repository.interface';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class GetUserWhenRefreshTokenUsecase
  implements IUsecase<RefreshTokenUserRequest, UserDto>
{
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
    private readonly userRefreshTokenRepository: UserRefreshTokenDbRepository,
    private readonly bcryptService: IBcryptService,
    private readonly cryptoService: ICryptoService,
  ) {}

  async execute(request: RefreshTokenUserRequest): Promise<UserDto> {
    const user = await this.userRepository.getByUsername(request.username);
    if (!user) {
      return null;
    }

    const userRefreshToken = await this.userRefreshTokenRepository.getByUserId(
      user.id,
    );
    if (!userRefreshToken) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      request.refreshToken,
      userRefreshToken.token,
    );
    if (isRefreshTokenMatching) {
      return user.toUserDto(this.cryptoService);
    }

    return null;
  }
}
