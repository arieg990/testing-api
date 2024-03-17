import { Injectable } from '@nestjs/common';
import { ApiClient } from '@core/entity/api-client.entity';
import { Geo } from '@core/entity/geo.entity';
import { Movie } from '@core/entity/movie.entity';
import { UserRefreshToken } from '@core/entity/user-refresh-token.entity';
import { User } from '@core/entity/user.entity';

@Injectable()
export class EntityModule {
  static API_CLIENT_ENTITY = 'apiClientEntity';
  static USER_ENTITY = 'userEntity';
  static USER_REFRESH_TOKEN_ENTITY = 'userRefreshTokenEntity';
  static MOVIE_ENTITY = 'movieEntity';
  static GEO_ENTITY = 'geoEntity';

  static register() {
    return [
      {
        provide: this.API_CLIENT_ENTITY,
        useValue: ApiClient,
      },
      {
        provide: this.USER_ENTITY,
        useValue: User,
      },
      {
        provide: this.USER_REFRESH_TOKEN_ENTITY,
        useValue: UserRefreshToken,
      },
      {
        provide: this.MOVIE_ENTITY,
        useValue: Movie,
      },
      {
        provide: this.GEO_ENTITY,
        useValue: Geo,
      },
    ];
  }
}
