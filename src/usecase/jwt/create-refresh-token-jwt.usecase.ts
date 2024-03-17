import { JwtConfig } from '@domains/config/jwt.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IJwtServicePayload } from '@domains/models/jwt-service-payload.interface';
import { RefreshTokenRequest } from '@domains/models/request/refresh-token.request';
import { UserRefreshTokenRepository } from '@domains/repositories/user-refresh-token.repository';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';
import { ICryptoService } from '@domains/services/crypto-service.interface';
import { IJwtService } from '@domains/services/jwt-service.interface';
import { RefreshTokenUsecase } from '@domains/usecase/refresh-token.usecase';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class CreateRefreshTokenJwtUsecase
  extends RefreshTokenUsecase
  implements IUsecase<RefreshTokenRequest, string>
{
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    readonly userRefreshTokenRepository: UserRefreshTokenRepository,
    private readonly jwtConfig: JwtConfig,
    readonly bcryptService: IBcryptService,
    private readonly cryptoService: ICryptoService,
  ) {
    super(userRefreshTokenRepository, bcryptService);
  }

  async execute(request: RefreshTokenRequest): Promise<string> {
    this.logger.log(
      'CreateRefreshTokenJwtUsecase execute',
      `The user ${request.username} have been logged.`,
    );
    const payload: IJwtServicePayload = { username: request.username };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    const id = await this.cryptoService.decrypt(request.userId);
    await this.setCurrentRefreshToken(token, Number.parseInt(id));
    return token;
  }
}
