import { Module } from '@nestjs/common';
import { SegundoNivelZFormService } from './segundo-nivel-z.service';

@Module({
  providers: [SegundoNivelZFormService],
  exports: [SegundoNivelZFormService],
})
export class SegundoNivelZFormModule {}
