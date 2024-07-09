import { Module } from '@nestjs/common';
import { SegundoNivelXPTOFormService } from './terceiro-nivel-xpto.service';

@Module({
  providers: [SegundoNivelXPTOFormService],
  exports: [SegundoNivelXPTOFormService],
})
export class SegundoNivelXPTOFormModule {}
