import { Module } from '@nestjs/common';
import { TerceiroNivelUmFormService } from './terceiro-nivel-um.service';

@Module({
  providers: [TerceiroNivelUmFormService],
  exports: [TerceiroNivelUmFormService],
})
export class TerceiroNivelUmFormModule {}
