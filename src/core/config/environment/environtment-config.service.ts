import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '@domains/config/database.interface';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/types/sequelize';
import { JwtConfig } from '@domains/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JwtConfig {
  constructor(private configService: ConfigService) {}

  // Database
  getDialect(): Dialect {
    return this.configService.get<Dialect>('DATABASE_DIALECT');
  }

  getHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getPassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getPort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getUsername(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  // JWT
  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME');
  }
}
