import { Module } from '@nestjs/common';
import { SegundoNivelXFormService } from './segundo-nivel-x.service';

@Module({
  providers: [SegundoNivelXFormService],
  exports: [SegundoNivelXFormService],
})
export class SegundoNivelXFormModule {}
