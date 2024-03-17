import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { ICryptoService } from '@domains/services/crypto-service.interface';

import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService implements ICryptoService {
  password = 'BASE_64_KEY';
  algorithm = 'aes-256-ctr';

  async decrypt(text: string): Promise<string> {
    try {
      const key = await this.key();
      const iv = await this.iv();
      const decipher = createDecipheriv(this.algorithm, key, iv);
      let decrypted = decipher.update(text, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (e) {
      return null;
    }
  }

  async encrypt(text: string): Promise<string> {
    try {
      const key = await this.key();
      const iv = await this.iv();
      const cipher = createCipheriv(this.algorithm, key, iv);
      let encrypted = cipher.update(text, 'utf-8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (e) {
      return null;
    }
  }

  private async key(): Promise<Buffer> {
    return (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
  }

  private async iv(): Promise<Buffer> {
    return (await promisify(scrypt)(this.password, 'salt', 16)) as Buffer;
  }
}
