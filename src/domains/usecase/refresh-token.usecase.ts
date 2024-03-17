import { UserRefreshTokenRepository } from '@domains/repositories/user-refresh-token.repository';
import { IBcryptService } from '@domains/services/bcrypt-service.interface';

export abstract class RefreshTokenUsecase {
  protected constructor(
    readonly userRefreshTokenRepository: UserRefreshTokenRepository,
    readonly bcryptService: IBcryptService,
  ) {}
  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await this.bcryptService.hash(
      refreshToken,
    );
    await this.userRefreshTokenRepository.updateRefreshToken(
      id,
      currentHashedRefreshToken,
    );
  }
}
