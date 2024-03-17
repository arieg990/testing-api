import { Module } from '@nestjs/common';
import { CryptoService } from '@core/services/crypto/crypto.service';

@Module({
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
