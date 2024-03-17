import { EnvironmentConfigModule } from '@core/config/environment/environment-config.module';
import { databaseProviders } from './database.providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
