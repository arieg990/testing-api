import { EntityModule } from '@core/entity/entity.module';
import { UserRefreshToken } from '@core/entity/user-refresh-token.entity';
import { UserRefreshTokenRepository } from '@domains/repositories/user-refresh-token.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserRefreshTokenDbRepository
  implements UserRefreshTokenRepository
{
  constructor(
    @Inject(EntityModule.USER_REFRESH_TOKEN_ENTITY)
    private readonly userRefreshTokenEntityRepository: typeof UserRefreshToken,
  ) {}

  async getByUserId(id: number): Promise<UserRefreshToken> {
    return await this.userRefreshTokenEntityRepository.findOne<UserRefreshToken>(
      {
        where: {
          user_id: id,
        },
      },
    );
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<UserRefreshToken> {
    const [result, affectedCount] =
      await this.userRefreshTokenEntityRepository.upsert<UserRefreshToken>(
        {
          token: refreshToken,
          user_id: userId,
        },
        {
          fields: ['token'],
          returning: true,
          conflictFields: ['user_id'],
        },
      );
    return result;
  }
}
