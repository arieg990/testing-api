import { Module } from '@nestjs/common';
import { BcryptService } from '@core/services/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
