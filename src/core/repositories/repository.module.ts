import { EntityModule } from '@core/entity/entity.module';
import { ApiClientDbRepository } from '@core/repositories/api-client-db.repository';
import { GeoDbRepository } from '@core/repositories/geo-db.repository';
import { MovieDbRepository } from '@core/repositories/movie-db.repository';
import { UserRefreshTokenDbRepository } from '@core/repositories/user-refresh-token-db.repository';
import { UserDbRepository } from './user-db.repository';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserDbRepository,
    UserRefreshTokenDbRepository,
    ApiClientDbRepository,
    MovieDbRepository,
    GeoDbRepository,
    ...EntityModule.register(),
  ],
  exports: [
    UserDbRepository,
    UserRefreshTokenDbRepository,
    ApiClientDbRepository,
    MovieDbRepository,
    GeoDbRepository,
  ],
})
export class RepositoriesModule {}
