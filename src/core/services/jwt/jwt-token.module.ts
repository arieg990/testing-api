import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EnvironmentConfigModule } from '@core/config/environment/environment-config.module';
import { EnvironmentConfigService } from '@core/config/environment/environtment-config.service';
import { JwtTokenService } from '@core/services/jwt/jwt-token.service';
import { JwtConfig } from '@domains/config/jwt.interface';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: async (jwtConfig: JwtConfig) => {
        return {
          secret: jwtConfig.getJwtSecret(),
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
