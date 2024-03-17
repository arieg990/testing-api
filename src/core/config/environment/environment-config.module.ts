import { ConfigModule } from '@nestjs/config';
import { validate } from '@core/config/environment/environment-config.validation';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
