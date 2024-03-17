import { UserRefreshToken } from '@core/entity/user-refresh-token.entity';

export interface UserRefreshTokenRepository {
  getByUserId(userId: number): Promise<UserRefreshToken>;
  updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<UserRefreshToken>;
}
