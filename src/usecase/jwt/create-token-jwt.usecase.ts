import { JwtConfig } from '@domains/config/jwt.interface';
import { ILogger } from '@domains/logger/logger.interface';
import { IJwtServicePayload } from '@domains/models/jwt-service-payload.interface';
import { IJwtService } from '@domains/services/jwt-service.interface';
import { IUsecase } from '@domains/usecase/usecase.interface';

export class CreateTokenJwtUsecase implements IUsecase<string, string> {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JwtConfig,
  ) {}

  async execute(request: string): Promise<string> {
    this.logger.log(
      'JwtUsecase execute',
      `The user ${request} have been logged.`,
    );
    const payload: IJwtServicePayload = { username: request };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    return this.jwtTokenService.createToken(payload, secret, expiresIn);
  }
}
