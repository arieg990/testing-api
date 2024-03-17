import { IsNumber, IsString, validateSync } from 'class-validator';
import { Dialect } from 'sequelize/types/sequelize';
import { plainToClass } from 'class-transformer';

class EnvironmentDatabaseVariables {
  // Database
  @IsString()
  DATABASE_HOST: string;
  @IsNumber()
  DATABASE_PORT: number;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_NAME: string;
  DATABASE_DIALECT: Dialect;

  // JWT
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;
  @IsString()
  JWT_REFRESH_SECRET: string;
  @IsString()
  JWT_REFRESH_EXPIRATION_TIME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentDatabaseVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
