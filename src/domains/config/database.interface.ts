import { Dialect } from 'sequelize/types/sequelize';
export interface DatabaseConfig {
  getDialect(): Dialect;
  getHost(): string;
  getPort(): number;
  getUsername(): string;
  getPassword(): string;
  getDatabaseName(): string;
}
