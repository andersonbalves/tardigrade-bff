import { Module } from '@nestjs/common';
import { TerceiroNivelDoisFormService } from './terceiro-nivel-dois.service';

@Module({
  providers: [TerceiroNivelDoisFormService],
  exports: [TerceiroNivelDoisFormService],
})
export class TerceiroNivelDoisFormModule {}
