export interface JwtConfig {
  getJwtSecret(): string;
  getJwtRefreshSecret(): string;
  getJwtExpirationTime(): string;
  getJwtRefreshExpirationTime(): string;
}
