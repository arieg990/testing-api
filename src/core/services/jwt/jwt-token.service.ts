import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtServicePayload } from '@domains/models/jwt-service-payload.interface';
import { IJwtService } from '@domains/services/jwt-service.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
