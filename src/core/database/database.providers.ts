import { Sequelize } from 'sequelize-typescript';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { ApiClient } from '@core/entity/api-client.entity';
import { Geo } from '@core/entity/geo.entity';
import { Movie } from '@core/entity/movie.entity';
import { UserRefreshToken } from '@core/entity/user-refresh-token.entity';
import { User } from '@core/entity/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [EnvironmentConfigService],
    useFactory: async (dbConfig: EnvironmentConfigService) => {
      const sequelize = new Sequelize({
        dialect: dbConfig.getDialect(),
        host: dbConfig.getHost(),
        port: dbConfig.getPort(),
        username: dbConfig.getUsername(),
        password: dbConfig.getPassword(),
        database: dbConfig.getDatabaseName(),
      });
      sequelize.addModels([User, UserRefreshToken, ApiClient, Movie, Geo]);

      await sequelize.sync();
      return sequelize;
    },
  },
];
