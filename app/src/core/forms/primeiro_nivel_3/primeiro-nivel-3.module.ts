import { Module } from '@nestjs/common';
import { PrimeiroNivelTresFormService } from './primeiro-nivel-3.service';

@Module({
  providers: [PrimeiroNivelTresFormService],
  exports: [PrimeiroNivelTresFormService],
})
export class PrimeiroNivelTresFormModule {}
