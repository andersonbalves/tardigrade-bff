import { Module } from '@nestjs/common';
import { SegundoNivelBFormService } from './segundo-nivel-b.service';

@Module({
  providers: [SegundoNivelBFormService],
  exports: [SegundoNivelBFormService],
})
export class SegundoNivelBFormModule {}
